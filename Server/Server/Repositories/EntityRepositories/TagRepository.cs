using Azure;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Models;

namespace Server.Repositories.EntityRepositories
{
    public class TagRepository : ITagRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public TagRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }

        public async Task<Tag> CreateTag(string tagName)
        {
            Tag tag = new Tag()
            {
                Name = tagName
            };
            await _learnMeDbContext.Tags.AddAsync(tag);

            await _learnMeDbContext.SaveChangesAsync();

            return tag;
        }

        public Task<bool> CheckIfTagExistsByName(string tagName) =>
            _learnMeDbContext.Tags.AnyAsync(t => t.Name == tagName);

        public Task<Tag> GetTagByName(string tagName) =>
            _learnMeDbContext.Tags.FirstOrDefaultAsync(t => t.Name == tagName);

        public Task<bool> CheckIfTagExistsById(int tagId)=>
            _learnMeDbContext.Tags.AnyAsync(t => t.Id == tagId);

        public async Task<List<int>> GetTagIds(string[] tagNames)
        {
            List<int> tagIds = new List<int>();

            foreach (var tagName in tagNames)
            {
                Tag tag;
                if (!await CheckIfTagExistsByName(tagName))
                {
                    tag = await CreateTag(tagName);
                }
                else
                {
                    tag = await GetTagByName(tagName);
                }
                tagIds.Add(tag.Id);
            }
            return tagIds;
        }
    }
}
