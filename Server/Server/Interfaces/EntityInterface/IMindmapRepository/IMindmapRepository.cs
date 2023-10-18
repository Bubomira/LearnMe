using Server.DTOs.MindmapDtos.Import;
using Server.Models;

namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapRepository
    {
        public Task<Mindmap> GetMindmapDetails(int id);
        public Task<Mindmap> CreateMindmap(MindmapInfoDto mindmapInfoDto,int ownerId);
        public Task UpdateMindmap(int mindmapId,string newName);
        public Task DeleteMindmap(int mindmapId);
        public Task<bool> CheckIfMindmapExists(int mindmapId);
        public Task<bool> CheckIfMindmapIsOwnedByUser(int mindmapId,int userId);

    }
}
