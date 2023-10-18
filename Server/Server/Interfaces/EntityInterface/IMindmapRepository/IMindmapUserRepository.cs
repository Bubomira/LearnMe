using Server.Models;

namespace Server.Interfaces.EntityInterface.IMindmapRepository
{
    public interface IMindmapUserRepository
    {
        public Task<List<LikedUserMindmap>> GetLikedMindmaps(int userId);
        public Task<List<Mindmap>> GetOwnedMindmaps(int userId);
        public Task LikeMindmap(int mindmapId,int userId);
        public Task DislikeMindmap(int mindmapId, int userId);
        public Task<bool> CheckIfMindmapIsLikedByUser(int mindmapId,int userId);

    }
}
