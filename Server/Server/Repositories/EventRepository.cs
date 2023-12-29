using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface;

namespace Server.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public EventRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<string> GetEventsJSONByUserId(int userId) =>
            _learnMeDbContext.Users.Where(u => u.Id == userId)
            .Select(u => u.EventsJSON)
            .FirstOrDefaultAsync();
      

        public async Task SaveEventsForCurrentUser(int userId, string eventJSON)
        {
            var user = await _learnMeDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            user.EventsJSON = eventJSON;

            _learnMeDbContext.SaveChangesAsync();
        }
    }
}
