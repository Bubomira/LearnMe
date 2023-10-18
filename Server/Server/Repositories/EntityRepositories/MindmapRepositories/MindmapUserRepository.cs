using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Models;

namespace Server.Repositories.EntityRepositories.MindmapRepositories
{
    public class MindmapUserRepository : IMindmapUserRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;
        public MindmapUserRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }

        public Task<bool> CheckIfMindmapIsLikedByUser(int mindmapId, int userId) =>
            _learnMeDbContext.LikedUsersMindmaps.AnyAsync(lum => lum.MindmapId == mindmapId && lum.LikerUserId == userId);
      

        public async Task DislikeMindmap(int mindmapId, int userId)
        {
           var mindmapUser= await _learnMeDbContext.LikedUsersMindmaps
                .FirstOrDefaultAsync(lum => lum.MindmapId == mindmapId && lum.LikerUserId == userId);

            _learnMeDbContext.Remove(mindmapUser);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<List<LikedUserMindmap>> GetLikedMindmaps(int userId) =>
            _learnMeDbContext.LikedUsersMindmaps.Where(lum => lum.LikerUserId == userId)
            .Include(lum => lum.Mindmap.MindmapsTags)
            .ThenInclude(mt => mt.Tag)
            .ToListAsync();
            
       

        public Task<List<Mindmap>> GetOwnedMindmaps(int userId) =>
            _learnMeDbContext.Mindmaps.Where(m => m.OwnerId == userId)
            .ToListAsync();
       

        public async Task LikeMindmap(int mindmapId, int userId)
        {
            var likedUserMindmap = new LikedUserMindmap() { MindmapId=mindmapId,LikerUserId=userId};

            await _learnMeDbContext.LikedUsersMindmaps.AddAsync(likedUserMindmap);

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
