using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Models;

namespace Server.Repositories.EntityRepositories.MindmapRepositories
{
    public class MindmapRepository : IMindmapRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public MindmapRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfMindmapExists(int mindmapId) =>
            _learnMeDbContext.Mindmaps.AnyAsync(m => m.Id == mindmapId);

        public Task<bool> CheckIfMindmapIsOwnedByUser(int mindmapId, int userId) =>
            _learnMeDbContext.Mindmaps.AnyAsync(m => m.Id == mindmapId && m.OwnerId == userId);

        public Task<Mindmap> CreateMindmap()
        {
            throw new NotImplementedException();
        }

        public async Task DeleteMindmap(int mindmapId)
        {
            var mindmap = await _learnMeDbContext.Mindmaps.FirstOrDefaultAsync(m => m.Id = mindmapId);

            _learnMeDbContext.Mindmaps.Remove(mindmap);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<Mindmap> GetMindmapDetails(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateMindmap(int mindmapId)
        {
            throw new NotImplementedException();
        }
    }
}
