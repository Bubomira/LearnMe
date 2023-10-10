namespace Server.Interfaces.ServiceInterfaces
{
    public interface IPasswordHasher
    {
        public Task<string> CreatePasswordHash(string password);
        public Task<bool> CheckIfPasswordsAreEqual(string inputPassword, string originalHash);
    }
}
