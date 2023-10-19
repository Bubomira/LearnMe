using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Models;

namespace Server.Interfaces.EntityInterface
{
    public interface IFlashcardRepository
    {
        public Task<Flashcard> GetFlashcardById(int id);
        public Task CreateFlashcard(FlashcardInfoDto flashcardInfoDto, FlashcardType type, int ownerId);
        public Task UpdateFlashcard(int id, FlashcardInfoDto flashcardInfoDto);
        public Task DeleteFlashcard(int id);
        public Task<bool> CheckIfFlashcardExists(int id);

        public Task<bool> CheckIfUserOwnsTheFlashcard(int ownerId, int flashcardId);
        public Task<List<Flashcard>> SearchFlashcardsByDefinition(string name);

    }
}
