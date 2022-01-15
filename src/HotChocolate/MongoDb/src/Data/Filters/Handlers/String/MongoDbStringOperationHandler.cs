using HotChocolate.Configuration;
using HotChocolate.Types;
using HotChocolate.Data.Filters;

namespace HotChocolate.Data.MongoDb.Filters
{
    public abstract class MongoDbStringOperationHandler
        : MongoDbOperationHandlerBase
    {
        public MongoDbStringOperationHandler(InputParser inputParser) : base(inputParser)
        {
        }

        protected abstract int Operation { get; }

        public override bool CanHandle(
            ITypeCompletionContext context,
            IFilterInputTypeDefinition typeDefinition,
            IFilterFieldDefinition fieldDefinition)
        {
            return context.Type is StringOperationFilterInputType &&
                fieldDefinition is FilterOperationFieldDefinition operationField &&
                operationField.Id == Operation;
        }
    }
}
