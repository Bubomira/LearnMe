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
        public async Task AttachTagsToMindmap(List<int> mindmapIds, int tagId)
        {
            for (int i = 0; i < mindmapIds.Count; i++)
            {
            var mindmapTag = new MindmapTag() { TagId = tagId, MindmapId = mindmapIds[i] };

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
    }
}
