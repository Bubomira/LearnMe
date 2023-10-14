namespace Server.Interfaces.EntityInterface.INotesRepositories
{
    public interface INoteUserRepository
    {
        public Task<bool> CheckIfNoteIsLikedByUser(int noteId, int userId);
        public Task LikeNote(int noteId, int userId);
        public Task DislikeNote(int noteId, int userId);
    }
}
