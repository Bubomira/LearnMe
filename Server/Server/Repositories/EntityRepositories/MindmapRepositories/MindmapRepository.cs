using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.MindmapDtos.Import;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Migrations;
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

        public async Task<Mindmap> CreateMindmap(MindmapInfoDto mindmapInfoDto,int ownerId)
        {
            Mindmap mindmap = new Mindmap()
            {
                OwnerId = ownerId,
                Name = mindmapInfoDto.Name,
                JSONDiagram=""
            };

            await _learnMeDbContext.Mindmaps.AddAsync(mindmap);

            await _learnMeDbContext.SaveChangesAsync();

            return mindmap;
        }

        public async Task DeleteMindmap(int mindmapId)
        {
            var mindmap = await _learnMeDbContext.Mindmaps.FirstOrDefaultAsync(m => m.Id == mindmapId);

            _learnMeDbContext.Mindmaps.Remove(mindmap);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<Mindmap> GetMindmapDetails(int id) =>
            _learnMeDbContext.Mindmaps.Where(m => m.Id == id)
            .Include(m => m.MindmapsTags)
            .ThenInclude(mt => mt.Tag)
            .FirstOrDefaultAsync();

        public async Task SaveMindmapJSONDiagram(int mindmapId, string diagramJson)
        {
            var mindmap = await _learnMeDbContext.Mindmaps.FirstOrDefaultAsync(m => m.Id == mindmapId);

            mindmap.JSONDiagram = diagramJson;

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<List<Mindmap>> SearchMindmapsByName(string mindmapName)=>
             _learnMeDbContext.Mindmaps
            .Where(m => m.Name.ToLower().StartsWith(mindmapName.ToLower()) ||
            m.Name.ToLower().EndsWith(mindmapName.ToLower()) ||
           m.Name.ToLower().Contains(mindmapName.ToLower()))
            .Include(m => m.MindmapsTags)
            .ThenInclude(mt => mt.Tag)
            .ToListAsync();

        public async Task UpdateMindmap(int mindmapId,string newName)
        {
            var mindmap = await _learnMeDbContext.Mindmaps.FirstOrDefaultAsync(m => m.Id == mindmapId);

            mindmap.Name = newName;

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
