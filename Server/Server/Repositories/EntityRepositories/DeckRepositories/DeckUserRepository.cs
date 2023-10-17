using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.DeckRepositories
{
    public class DeckUserRepository : IDeckUserRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public DeckUserRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfDeckIsLikedByUser(int deckId, int userId) =>
            _learnMeDbContext.LikedUserDecks.AnyAsync(lud => lud.DeckId == deckId && lud.LikerUserId == userId);


        public async Task DislikeDeck(int deckId, int userId)
        {
            var likedDeckUser = await _learnMeDbContext.LikedUserDecks.FirstOrDefaultAsync(lud => lud.DeckId == deckId && lud.LikerUserId == userId);

            _learnMeDbContext.LikedUserDecks.Remove(likedDeckUser);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<List<Deck>> GetLikedDecks(int userId) =>
            _learnMeDbContext.LikedUserDecks.Where(lud => lud.LikerUserId == userId)
            .Select(lud => lud.Deck)
            .ToListAsync();

        public Task<List<Deck>> GetOwnedDecks(int userId) =>
         _learnMeDbContext.Decks.Where(d => d.OwnerId == userId)
            .ToListAsync();

        public async Task LikeDeck(int deckId, int userId)
        {
            var likedDeckUser = new LikedUserDeck()
            {
                DeckId = deckId,
                LikerUserId = userId
            };

            await _learnMeDbContext.LikedUserDecks.AddAsync(likedDeckUser);

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
