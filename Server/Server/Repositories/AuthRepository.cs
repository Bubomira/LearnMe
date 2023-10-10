using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.AuthDtos.ImportDtos;
using Server.Interfaces.AuthInterface;
using Server.Models;

namespace Server.Repositories
{
    public class AuthRepository : IAuthRepository
    {

        private readonly LearnMeDbContext _learnMeDbContext;

        public AuthRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }

        public Task<bool> CheckIfUserExistByEmail(string email)
        {
            return _learnMeDbContext.Users.AnyAsync(u => u.Email == email);
        }

        public Task<bool> CheckIfUserExistByUsername(string username)
        {
            return _learnMeDbContext.Users.AnyAsync(u => u.Username == username);
        }

        public Task<bool> CheckIfUserExistByUsernameOrEmail(string input)
        {
            return _learnMeDbContext.Users.AnyAsync(u => u.Email == input || u.Username == input);
        }

        public Task<User> LoginUser(UserLoginDto userRegisterDto)
        {
            return _learnMeDbContext.Users.Where(u => u.Email == userRegisterDto.LoginString
            || u.Username == userRegisterDto.LoginString)
                .FirstOrDefaultAsync();
        }

        public async Task<User> RegisterUser(UserRegisterDto userRegisterDto, string passHash)
        {
            User user = new User()
            {
                Username = userRegisterDto.Username,
                Email = userRegisterDto.Email,
                PasswordHash = passHash
            };

            await _learnMeDbContext.Users.AddAsync(user);

            await _learnMeDbContext.SaveChangesAsync();

            return user;
        }

        public async Task LogoutUser(string token)
        {
            InvalidToken invalidToken = new InvalidToken()
            {
                ValueOfInvalidToken = token
            };

            await _learnMeDbContext.InvalidTokens.AddAsync(invalidToken);

            await _learnMeDbContext.SaveChangesAsync();

        }
    }
}
