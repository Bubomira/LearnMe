using Server.Models;

namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapTagRepository
    {
        public Task<bool> CheckIfTagIsAttachedToMindmap(int mindmapId, int tagId);
        public Task AttachTagsToMindmap(List<int> mindmapIds, int tagId);
        public Task DetachTagFromMindmap(int mindmapId, int tagId);

        public Task<List<MindmapTag>> SearchMindmapsByTag(int tagId);
    }
}
