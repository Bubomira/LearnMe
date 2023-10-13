using Server.Interfaces.EntityInterface;

namespace Server.Repositories.EntityRepositories.DeckRepositories
{
    public class DeckFlashcardRepository : IDeckFlashcardRepository
    {
        public Task AttachFlashcardToDeck(int flashcardId, int deckId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CheckIfFlashcardIsAttachedToDeck(int flashcardId, int deckId)
        {
            throw new NotImplementedException();
        }

        public Task RemoveFlashcardFromDeck(int flashcardId, int deckId)
        {
            throw new NotImplementedException();
        }
    }
}
