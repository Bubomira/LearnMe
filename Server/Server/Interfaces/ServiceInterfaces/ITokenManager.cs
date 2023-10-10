using Server.Models;

namespace Server.Interfaces.ServiceInterfaces
{
    public interface ITokenManager
    {
        public Task<string> CreateToken(User user);

        public Task BlackListToken(string token);

        public Task<bool> CheckIfTokenIsBlacklisted(string token);

        public Task<bool> CheckIfTokenIsValid(string tokenToBeChecked);
    }
}
