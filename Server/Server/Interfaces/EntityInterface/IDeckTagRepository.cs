namespace Server.Interfaces.EntityInterface
{
    public interface IDeckTagRepository
    {
        public Task AttachTagToDeck(int tagId, int deckId);

        public Task DetachTagFromDeck(int tagId, int deckId);


        public Task<bool> CheckIfTagIsAttachedToDeck(int tagId, int deckId);
    }
}
