using Server.Models;

namespace Server.Interfaces.EntityInterface.INotesRepositories
{
    public interface INoteRepository
    {
        public Task<Note> GetNotesDetails(int noteId);
        public Task<Note> CreateNote();
        public Task UpdateNote(int noteId);
        public Task DeleteNote(int noteId);
        public Task<bool> CheckIfNoteExists(int noteId);
        public Task<bool> CheckIfNoteIsOwnedByUser(int noteId, int userId);

    }
}
