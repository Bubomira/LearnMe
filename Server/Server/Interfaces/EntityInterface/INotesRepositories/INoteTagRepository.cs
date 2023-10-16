namespace Server.Interfaces.EntityInterface.INotesRepositories
{
    public interface INoteTagRepository
    {
        public Task<bool> CheckIfTagIsAttachedToNote(int tagId, int noteId);
        public Task AttachTagToNote(List<int> tagIds, int noteId);
        public Task DetachTagFromNote(int tagId, int noteId);
    }
}
