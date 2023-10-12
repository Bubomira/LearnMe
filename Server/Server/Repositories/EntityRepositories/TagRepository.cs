using Azure;
using Microsoft.EntityFrameworkCore;
using Server.Data;
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

    }
}
