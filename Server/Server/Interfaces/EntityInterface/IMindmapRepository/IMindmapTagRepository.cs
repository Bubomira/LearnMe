namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapTagRepository
    {
        public Task<bool> CheckIfTagIsAttachedToMindmap(int mindmapId, int tagId);
        public Task AttachTagToMindmap(int mindmapId, int tagId);
        public Task DetachTagFromMindmap(int mindmapId, int tagId);
    }
}
