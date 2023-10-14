using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.DeckRepositories
{
    public class DeckFlashcardRepository : IDeckFlashcardRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public DeckFlashcardRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public async Task AttachFlashcardToDeck(int flashcardId, int deckId)
        {
            DeckFlashcard deckFlashcard = new DeckFlashcard()
            {
                DeckId = deckId,
                FlashcardId = flashcardId
            };

            await _learnMeDbContext.DecksFlashcards.AddAsync(deckFlashcard);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<bool> CheckIfFlashcardIsAttachedToDeck(int flashcardId, int deckId) =>
            _learnMeDbContext.DecksFlashcards.AnyAsync(df => df.FlashcardId == flashcardId && df.DeckId == deckId);



        public async Task RemoveFlashcardFromDeck(int flashcardId, int deckId)
        {
            DeckFlashcard deckFlashcard = await _learnMeDbContext.DecksFlashcards
                .FirstOrDefaultAsync(df => df.FlashcardId == flashcardId && df.DeckId == deckId);

            _learnMeDbContext.DecksFlashcards.Remove(deckFlashcard);

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
