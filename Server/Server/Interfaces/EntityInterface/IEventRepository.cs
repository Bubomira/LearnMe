namespace Server.Interfaces.EntityInterface
{
    public interface IEventRepository
    {
        public Task<string> GetEventsJSONByUserId(int userId);

        public Task SaveEventsForCurrentUser(int userId,string eventJSON);
    }
}
