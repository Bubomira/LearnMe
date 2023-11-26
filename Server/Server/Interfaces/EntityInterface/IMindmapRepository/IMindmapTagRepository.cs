using Server.Models;

namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapTagRepository
    {
        public Task<bool> CheckIfTagIsAttachedToMindmap(int mindmapId, int tagId);
        public Task AttachTagsToMindmap(List<int> tagIds, int mindmapId);
        public Task DetachTagFromMindmap(int mindmapId, int tagId);

        public Task<List<MindmapTag>> SearchMindmapsByTag(int tagId);
    }
}
