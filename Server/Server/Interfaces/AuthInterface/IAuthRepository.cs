using Server.DTOs.AuthDtos.ImportDtos;
using Server.Models;

namespace Server.Interfaces.AuthInterface
{
    public interface IAuthRepository
    {
        public Task<bool> CheckIfUserExistByUsernameOrEmail(string input);
        public Task<bool> CheckIfUserExistByEmail(string email);
        public Task<bool> CheckIfUserExistByUsername(string username);
        public Task<User> RegisterUser(UserRegisterDto userRegisterDto,string passHash);
        public Task<User> LoginUser(UserLoginDto userRegisterDto);

        public Task LogoutUser(string token);

    }
}
