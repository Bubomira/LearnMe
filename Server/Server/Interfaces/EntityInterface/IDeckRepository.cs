using Server.Models;

namespace Server.Interfaces.EntityInterface
{
    public interface IDeckRepository
    {
        public Task<Deck> GetDeckDetails(int deckId);
        public Task CreateDeck();
        public Task DeleteDeck(int deckId);
        public Task UpdateDeck(int deckId);
        public Task<bool> CheckIfDeckIsOwnedByUser(int deckId, int userId);
        public Task<bool> CheckIfDeckExists(int deckId);
    }
}
