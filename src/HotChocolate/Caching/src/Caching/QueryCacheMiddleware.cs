using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate.Execution;
using HotChocolate.Execution.Processing;
using HotChocolate.Language;
using HotChocolate.Validation;

namespace HotChocolate.Caching;

public sealed class QueryCacheMiddleware
{
    private static readonly string _contextKey = nameof(CacheControlOptions);

    private readonly RequestDelegate _next;
    private readonly DocumentValidatorContextPool _contextPool;
    private readonly IQueryCache _cache;
    private readonly CacheControlValidatorVisitor _compiler;
    private readonly ICacheControlOptions _options;

    public QueryCacheMiddleware(
        RequestDelegate next,
        DocumentValidatorContextPool contextPool,
        ICacheControlOptionsAccessor optionsAccessor,
        IQueryCache cache)
    {
        _next = next;
        _contextPool = contextPool;
        _cache = cache;

        _options = optionsAccessor.CacheControl;
        _compiler = new CacheControlValidatorVisitor(_options);
    }

    public async ValueTask InvokeAsync(IRequestContext context)
    {
        // todo: add context key for skipping the query cache on a per-request basis
        if (!_options.Enable)
        {
            await _next(context).ConfigureAwait(false);
        }
        else
        {
            if (_cache.ShouldReadResultFromCache(context))
            {
                IQueryResult? cachedResult =
                    await _cache.TryReadCachedQueryResultAsync(context, _options);

                if (cachedResult is not null)
                {
                    // todo: return result served from cache and short circuit
                    //       without caching again
                }
            }

            await _next(context).ConfigureAwait(false);

            if (context.DocumentId is not null &&
                context.OperationId is not null &&
                context.Document is not null &&
                _cache.ShouldWriteResultToCache(context))
            {
                DocumentNode document = context.Document;
                OperationDefinitionNode operationDefinition =
                    context.Operation?.Definition ??
                    document.GetOperation(context.Request.OperationName);

                // todo: try to get from operation cache
                // var cacheId = context.CreateCacheId(context.OperationId);

                CacheControlResult? result = ComputeCacheControlResult(context, document, operationDefinition);

                if (result is null)
                {
                    return;
                }

                await _cache.CacheQueryResultAsync(context, result, _options);
            }
        }
    }

    private CacheControlResult? ComputeCacheControlResult(IRequestContext context,
        DocumentNode document, OperationDefinitionNode operationDefinition)
    {
        DocumentValidatorContext validatorContext = _contextPool.Get();
        CacheControlResult? operationCacheControlResult = null;

        try
        {
            PrepareContext(context, document, validatorContext);

            _compiler.Visit(document, validatorContext);

            var cacheControlResults = (List<CacheControlResult>)validatorContext.List.Peek()!;

            foreach (CacheControlResult cacheControlResult in cacheControlResults)
            {
                if (cacheControlResult.OperationDefinitionNode == operationDefinition)
                {
                    operationCacheControlResult = cacheControlResult;
                }

                // todo: add to operation cache
                // var cacheId = context.CreateCacheId(
                //          CreateOperationId(
                //              context.DocumentId!,
                //              cacheControlResult.OperationDefinitionNode.Name?.Value));
            }
        }
        finally
        {
            validatorContext.Clear();
            _contextPool.Return(validatorContext);
        }

        // todo: handle dynamic cache hints set via IResolverContext

        return operationCacheControlResult!;
    }

    private static void PrepareContext(IRequestContext requestContext,
        DocumentNode document, DocumentValidatorContext validatorContext)
    {
        validatorContext.Schema = requestContext.Schema;

        for (var i = 0; i < document.Definitions.Count; i++)
        {
            if (document.Definitions[i] is FragmentDefinitionNode fragmentDefinition)
            {
                validatorContext.Fragments[fragmentDefinition.Name.Value] = fragmentDefinition;
            }
        }

        validatorContext.ContextData = requestContext.ContextData;
    }
}