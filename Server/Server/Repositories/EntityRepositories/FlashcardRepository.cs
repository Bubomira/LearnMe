using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Interfaces.EntityInterface;
using Server.Models;

namespace Server.Repositories.EntityRepositories
{
    public class FlashcardRepository : IFlashcardRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public FlashcardRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfFlashcardExists(int id)
        {
            return _learnMeDbContext.Flashcards.AnyAsync(f => f.Id == id);
        }

        public Task<Flashcard> GetFlashcardById(int id)
        {
            return _learnMeDbContext.Flashcards.Where(f => f.Id == id)
                .Include(f => f.OwnedFlashcards)
                .FirstOrDefaultAsync();
        }

        public async Task CreateFlashcard(FlashcardInfoDto flashcardInfoDto, FlashcardType type, int ownerId)
        {
            Flashcard flashcard = new Flashcard()
            {
                Type = type,
                Definition = flashcardInfoDto.Definition,
                Explanation = flashcardInfoDto.Explanation,
            };

            await _learnMeDbContext.Flashcards.AddAsync(flashcard);
            await _learnMeDbContext.SaveChangesAsync();

            FlashcardUser ownerRelationship = new FlashcardUser()
            {
                Flashcard = flashcard,
                OwnerId = ownerId
            };

            await _learnMeDbContext.OwnedUserFlashcards.AddAsync(ownerRelationship);
            await _learnMeDbContext.SaveChangesAsync();
        }

        public async Task DeleteFlashcard(int id)
        {
            var flashcard = await _learnMeDbContext.Flashcards.FirstOrDefaultAsync(f => f.Id == id);

            _learnMeDbContext.Remove(flashcard);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public async Task UpdateFlashcard(int id, FlashcardInfoDto flashcardInfoDto)
        {
            var flashcard = await _learnMeDbContext.Flashcards.FirstOrDefaultAsync(f => f.Id == id);

            flashcard.Explanation = flashcardInfoDto.Explanation;
            flashcard.Definition = flashcardInfoDto.Definition;

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<bool> CheckIfUserOwnsTheFlashcard(int ownerId, int flashcardId)
        {
            return _learnMeDbContext.OwnedUserFlashcards.AnyAsync(ouf => ouf.FlashcardId == flashcardId && ouf.OwnerId == ownerId);
        }
    }
}
