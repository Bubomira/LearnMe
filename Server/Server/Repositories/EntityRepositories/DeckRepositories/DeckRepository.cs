using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Migrations;
using Server.Models;

namespace Server.Repositories.EntityRepositories.DeckRepositories
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
            => _learnMeDbContext.Decks.AnyAsync(d => d.Id == deckId && d.OwnerId == userId);


        public async Task<Deck> CreateDeck(DeckInfoDto deckInfoDto, int ownerId)
        {
            Deck deck = new Deck()
            {
                Name = deckInfoDto.Name,
                OwnerId = ownerId
            };
            await _learnMeDbContext.Decks.AddAsync(deck);

            await _learnMeDbContext.SaveChangesAsync();

            return deck;
        }

        public async Task DeleteDeck(int deckId)
        {
            var deck = await GetDeck(deckId);

            _learnMeDbContext.Decks.Remove(deck);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<Deck> GetDeck(int deckId) =>
             _learnMeDbContext.Decks.FirstOrDefaultAsync(d => d.Id == deckId);


        public Task<Deck> GetDeckDetails(int deckId) =>
             _learnMeDbContext.Decks.Where(d => d.Id == deckId)
            .Include(d => d.DecksFlashcards)
            .ThenInclude(d => d.Flashcard)
            .Include(f => f.DecksTags)
            .ThenInclude(d => d.Tag)
            .FirstOrDefaultAsync();

        public async Task UpdateDeck(int deckId, string deckName)
        {
            var deck = await GetDeck(deckId);

            deck.Name = deckName;

            await _learnMeDbContext.SaveChangesAsync();
        }

    }
}
