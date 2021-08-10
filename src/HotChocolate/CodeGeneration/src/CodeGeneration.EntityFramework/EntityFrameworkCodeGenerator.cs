using System.Linq;
using HotChocolate.CodeGeneration.EntityFramework.Types;
using HotChocolate.CodeGeneration.Types;
using HotChocolate.Types;
using HotChocolate.Types.Introspection;
using Humanizer;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using static HotChocolate.CodeGeneration.TypeNames;
using static Microsoft.CodeAnalysis.CSharp.SyntaxFactory;
using SyntaxKind = Microsoft.CodeAnalysis.CSharp.SyntaxKind;

namespace HotChocolate.CodeGeneration.EntityFramework
{
    public partial class EntityFrameworkCodeGenerator : ICodeGenerator
    {
        public CodeGenerationResult Generate(CodeGeneratorContext context)
        {
            var result = new CodeGenerationResult();

            ISchema schema = EntityFrameworkSchemaHelper.CreateSchema(context.Documents);

            GenerateTypes(
                result,
                DataGeneratorContext.FromSchema(schema),
                context,
                schema);

            return result;
        }

        private static void GenerateTypes(
            CodeGenerationResult result,
            DataGeneratorContext dataContext,
            CodeGeneratorContext generatorContext,
            ISchema schema)
        {
            var @namespace = generatorContext.Namespace;

            var schemaType = schema.Types.SingleOrDefault(t => t.Name.Value == "Schema") as ObjectType;
            SchemaConventionsDirective schemaConventions = schemaType?.GetFirstDirective(
                SchemaConventionsDirective.DirectiveName,
                new SchemaConventionsDirective())
                ?? new SchemaConventionsDirective();

            var dbContextClassName = schemaConventions.DbContextName;

            ClassDeclarationSyntax dbContextClass = GenerateDbContext(
                dbContextClassName,
                schemaType);

            // Generates models
            var objectTypes = schema.Types
                .OfType<ObjectType>()
                .Where(type => !IntrospectionTypes.IsIntrospectionType(type))
                .ToList();

            foreach (ObjectType objectType in objectTypes)
            {
                ProcessObjectType(
                    result,
                    ref dbContextClass,
                    @namespace,
                    objectType);
            }

            // Generate DbContext class
            result.AddClass(@namespace, dbContextClassName, dbContextClass);
        }

        private static ClassDeclarationSyntax GenerateDbContext(
            string dbContextClassName,
            ObjectType? schemaType)
        {
            ClassDeclarationSyntax dbContextClass = ClassDeclaration(dbContextClassName)
                .AddGeneratedAttribute()
                .AddModifiers(
                    Token(SyntaxKind.PublicKeyword));

            if (schemaType is not null)
            {
                SyntaxList<StatementSyntax> configurationStatements;

                foreach (IDbContextConfiguringDirective? dbContextConfiguringDirective in schemaType
                    .Directives
                    .OfType<IDbContextConfiguringDirective>())
                {
                    configurationStatements.Add(
                        dbContextConfiguringDirective.AsConfigurationStatement());
                }

                // TODO: Generate an OnModelConfiguring method and add it
                //dbContextClass = dbContextClass.
            }

            return dbContextClass;
        }

        private static void ProcessObjectType(
            CodeGenerationResult result,
            ref ClassDeclarationSyntax dbContextClass,
            string @namespace,
            IObjectType objectType)
        {
            TableDirective? tableDirective =
                objectType.GetFirstDirective<TableDirective>(TableDirectiveType.NameConst);
            JsonDirective? jsonDirective =
                objectType.GetFirstDirective<JsonDirective>(JsonDirectiveType.NameConst);

            if (tableDirective is not null && jsonDirective is not null)
            {
                // TODO: Think about how we do detailed errors
                throw new System.Exception("Can't have a type that's both a table and a nested JSON document.");
            }

            TypeNameDirective? typeNameDirective =
                objectType.GetFirstDirective<TypeNameDirective>("typeName");

            var modelName = tableDirective?.Name.Singularize(inputIsKnownToBePlural: false)
                ?? typeNameDirective?.Name
                ?? objectType.Name.Value;
            var modelNamePluralized = tableDirective?.Name.Pluralize(inputIsKnownToBeSingular: false)
                ?? typeNameDirective?.PluralName
                ?? typeNameDirective?.Name.Pluralize()
                ?? objectType.Name.Value.Pluralize();
            var modelConfigurerName = $"{modelName}Configurer";

            var isBackedByTable = jsonDirective is null;

            // Generate model class
            GenerateModel(result, @namespace, objectType, modelName);

            // If we've got a table, need to do a few more things
            if (isBackedByTable)
            {
                // Generate model configurer class
                GenerateModelConfigurer(result, @namespace, objectType, modelName, modelConfigurerName);

                // Add it on to the DbContext
                QualifiedNameSyntax? dbSetType = GetDbSetTypeName(@namespace, modelName);
                dbContextClass = dbContextClass.AddProperty(
                    modelNamePluralized,
                    dbSetType,
                    description: null,
                    setable: true);
            }
        }

        private static void GenerateModelConfigurer(
            CodeGenerationResult result,
            string @namespace,
            IObjectType objectType,
            string modelName,
            string modelConfigurerName)
        {
            ClassDeclarationSyntax modelConfigurerDeclaration =
                ClassDeclaration(modelConfigurerName)
                    .AddGeneratedAttribute()
                    .AddModifiers(
                        Token(SyntaxKind.PublicKeyword))
                    .WithBaseList(GetModelConfigurerBaseList(modelName));

            SyntaxList<StatementSyntax> configurationStatements;

            foreach (IModelConfiguringDirective directive in objectType.Directives
                .OfType<IModelConfiguringDirective>())
            {
                configurationStatements.Add(directive.AsConfigurationStatement());
            }

            MemberDeclarationSyntax configureMethod = GetModelConfigurerConfigureMethod(
                modelName,
                configurationStatements);

            modelConfigurerDeclaration = modelConfigurerDeclaration
                .WithMembers(SingletonList(configureMethod));

            result.AddClass(@namespace, modelConfigurerName, modelConfigurerDeclaration, _modelConfigurerUsings);
        }

        private static void GenerateModel(
            CodeGenerationResult result,
            string @namespace,
            IObjectType objectType,
            string modelName)
        {
            ClassDeclarationSyntax modelDeclaration =
                ClassDeclaration(modelName)
                    .AddGeneratedAttribute()
                    .AddModifiers(
                        Token(SyntaxKind.PublicKeyword),
                        Token(SyntaxKind.PartialKeyword));

            foreach (IObjectField field in objectType.Fields.Where(t => !t.IsIntrospectionField))
            {
                modelDeclaration =
                    modelDeclaration.AddProperty(
                        field.GetPropertyName(),
                        IdentifierName(field.GetTypeName(@namespace)),
                        field.Description,
                        setable: true);
            }

            result.AddClass(@namespace, modelName, modelDeclaration);
        }

        private static readonly QualifiedNameSyntax _msEfCoreQualifiedNameForNs =
            QualifiedName(
                IdentifierName("Microsoft"),
                IdentifierName("EntityFrameworkCore"));

        private static readonly QualifiedNameSyntax _msEfCoreQualifiedName =
            QualifiedName(
                AliasQualifiedName(
                    IdentifierName(Token(SyntaxKind.GlobalKeyword)),
                    IdentifierName("Microsoft")),
                IdentifierName("EntityFrameworkCore"));

        private static readonly GenericNameSyntax _dbSetGenericName =
            GenericName(Identifier("DbSet"));

        private static readonly UsingDirectiveSyntax[] _modelConfigurerUsings = new[]
        {
            UsingDirective(_msEfCoreQualifiedNameForNs),
            UsingDirective(
                QualifiedName(
                    QualifiedName(
                        _msEfCoreQualifiedNameForNs,
                        IdentifierName("Metadata")),
                    IdentifierName("Builders")))
        };

        private static BaseListSyntax GetModelConfigurerBaseList(string modelTypeName) =>
            BaseList(
                SingletonSeparatedList<BaseTypeSyntax>(
                    SimpleBaseType(
                        GenericName(
                            Identifier("IEntityTypeConfiguration"))
                        .WithTypeArgumentList(
                            TypeArgumentList(
                                SingletonSeparatedList<TypeSyntax>(
                                    IdentifierName(modelTypeName)))))));

        private static MemberDeclarationSyntax GetModelConfigurerConfigureMethod(
            string modelTypeName,
            SyntaxList<StatementSyntax> statements) =>
            MethodDeclaration(
                PredefinedType(
                    Token(SyntaxKind.VoidKeyword)),
                Identifier("Configure"))
            .WithModifiers(
                TokenList(
                    Token(SyntaxKind.PublicKeyword)))
            .WithParameterList(
                ParameterList(
                    SingletonSeparatedList(
                        Parameter(
                            Identifier("builder"))
                        .WithType(
                            GenericName(
                                Identifier("EntityTypeBuilder"))
                            .WithTypeArgumentList(
                                TypeArgumentList(
                                    SingletonSeparatedList<TypeSyntax>(
                                        IdentifierName(modelTypeName))))))))
            .WithBody(
                Block().WithStatements(statements));

        private static QualifiedNameSyntax GetDbSetTypeName(string @namespace, string modelTypeName)
        {
            IdentifierNameSyntax fullModelTypeName =
                IdentifierName(Global(@namespace + "." + modelTypeName));

            return QualifiedName(
                _msEfCoreQualifiedName,
                _dbSetGenericName.WithTypeArgumentList(
                    TypeArgumentList(
                        SingletonSeparatedList<TypeSyntax>(fullModelTypeName))));
        }
    }
}