using Server.DTOs.DeckDtos.ImportDtos;
using Server.Models;

namespace Server.Interfaces.EntityInterface
{
    public interface IDeckRepository
    {
        public Task<Deck> GetDeckDetails(int deckId);
        public Task<Deck> CreateDeck(DeckInfoDto deckInfoDto, int ownerId);
        public Task DeleteDeck(int deckId);
        public Task UpdateDeck(int deckId,string deckName);
        public Task<bool> CheckIfDeckIsOwnedByUser(int deckId, int userId);
        public Task<bool> CheckIfDeckExists(int deckId);

        public Task<Deck> GetDeck(int deckId);
    }
}
