using Server.Models;

namespace Server.Interfaces.EntityInterface
{
    public interface ITagRepository
    {
        public Task<Tag> CreateTag(string tagName);
        public Task<bool> CheckIfTagExistsByName(string tagName);

        public Task<bool> CheckIfTagExistsById(int tagId);

        public Task<List<int>> GetTagIds(string[] tagNames);

        public Task<Tag> GetTagByName(string tagName);
    }
}
