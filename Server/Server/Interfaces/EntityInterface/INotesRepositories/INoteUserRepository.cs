using Server.Models;

namespace Server.Interfaces.EntityInterface.INotesRepositories
{
    public interface INoteUserRepository
    {
        public Task<bool> CheckIfNoteIsLikedByUser(int noteId, int userId);
        public Task LikeNote(int noteId, int userId);
        public Task DislikeNote(int noteId, int userId);
        public Task<List<NoteUser>> GetLikedNotes(int userId);
        public Task<List<Note>> GetOwnedNotes(int userId);
    }
}
