using Server.Models;

namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapRepository
    {
        public Task<Mindmap> GetMindmapDetails(int id);
        public Task<Mindmap> CreateMindmap();
        public Task UpdateMindmap(int mindmapId);
        public Task DeleteMindmap(int mindmapId);
        public Task<bool> CheckIfMindmapExists(int mindmapId);

        public Task<bool> CheckIfMindmapIsOwnedByUser(int mindmapId,int userId);

    }
}
