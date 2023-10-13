namespace Server.Interfaces.EntityInterface.IDeckRepositories
{
    public interface IDeckFlashcardRepository
    {
        public Task AttachFlashcardToDeck(int flashcardId, int deckId);
        public Task RemoveFlashcardFromDeck(int flashcardId, int deckId);
        public Task<bool> CheckIfFlashcardIsAttachedToDeck(int flashcardId, int deckId);

    }
}
