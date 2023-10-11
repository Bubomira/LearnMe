using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface;
using Server.Models;

namespace Server.Repositories.EntityRepositories
{
    public class DeckRepository : IDeckRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public DeckRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfDeckExists(int deckId) =>
            _learnMeDbContext.Decks.AnyAsync(d => d.Id == deckId);


        public Task<bool> CheckIfDeckIsOwnedByUser(int deckId, int userId)
        {
            throw new NotImplementedException();
        }

        public Task CreateDeck()
        {
            throw new NotImplementedException();
        }

        public Task DeleteDeck(int deckId)
        {
            throw new NotImplementedException();
        }

        public Task<Deck> GetDeckDetails(int deckId) =>
             _learnMeDbContext.Decks.Where(d => d.Id == deckId)
            .Include(d => d.DecksFlashcards)
            .Include(f=>f.DecksTags)
            .FirstOrDefaultAsync();
                    
        public Task UpdateDeck(int deckId)
        {
            throw new NotImplementedException();
        }
    }
}
