using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Models;

namespace Server.Repositories.EntityRepositories.MindmapRepositories
{
    public class MindmapTagRepository : IMindmapTagRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;
        public MindmapTagRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public async Task AttachTagsToMindmap(List<int> tagIds, int mindmapId)
        {
            for (int i = 0; i < tagIds.Count; i++)
            {
            var mindmapTag = new MindmapTag() { TagId = tagIds[i], MindmapId =mindmapId };

            await _learnMeDbContext.MindmapsTags.AddAsync(mindmapTag);

            }
            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<bool> CheckIfTagIsAttachedToMindmap(int mindmapId, int tagId) =>
            _learnMeDbContext.MindmapsTags.AnyAsync(mt => mt.TagId == tagId && mt.MindmapId == mindmapId);
       
        public async Task DetachTagFromMindmap(int mindmapId, int tagId)
        {
           var mindmapTag = await _learnMeDbContext.MindmapsTags.FirstOrDefaultAsync(mt => mt.TagId == tagId && mt.MindmapId == mindmapId);

            _learnMeDbContext.MindmapsTags.Remove(mindmapTag);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<List<MindmapTag>> SearchMindmapsByTag(int tagId) =>
            _learnMeDbContext.MindmapsTags.Where(mt => mt.TagId == tagId)
            .Include(mt => mt.Mindmap)
            .ToListAsync();
       
    }
}
