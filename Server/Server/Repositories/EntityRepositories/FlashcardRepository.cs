using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Interfaces.FlashcardInterfaces;
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

        public async Task CreateFlashcard(FlashcardInfoDto flashcardInfoDto, FlashcardType type ,int ownerId)
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

        public Task DeleteFlashcard(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateFlashcard(int id)
        {
            throw new NotImplementedException();
        }
    }
}
