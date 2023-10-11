using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.AuthDtos.ExportDtos;
using Server.DTOs.AuthDtos.ImportDtos;
using Server.Interfaces.AuthInterface;
using Server.Interfaces.ServiceInterfaces;
using System.Security.Claims;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly ITokenManager _tokenManager;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IAuthRepository _authRepository;

        public AuthenticationController(IPasswordHasher passwordHasher, ITokenManager tokenManager, IAuthRepository authRepository)
        {
            _tokenManager = tokenManager;
            _passwordHasher = passwordHasher;
            _authRepository = authRepository;
        }


        [HttpPost("/register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {
            if (userRegisterDto == null ||
                string.IsNullOrEmpty(userRegisterDto.Email) ||
                string.IsNullOrEmpty(userRegisterDto.Username) ||
                string.IsNullOrEmpty(userRegisterDto.Password))
            {
                return BadRequest("Please fill in all fields!");
            }

            if (await _authRepository.CheckIfUserExistByEmail(userRegisterDto.Email)
                || await _authRepository.CheckIfUserExistByUsername(userRegisterDto.Username))
            {
                return BadRequest("Such user already exists!");
            }

            if (userRegisterDto.RePass != userRegisterDto.Password)
            {
                return BadRequest("Passwords do not match!");
            }

            var passwordHashed = await _passwordHasher.CreatePasswordHash(userRegisterDto.Password);

            var user = await _authRepository.RegisterUser(userRegisterDto, passwordHashed);

            var token = await _tokenManager.CreateToken(user);

            return Ok(new LoggedInUserDto()
            {
                Id = user.Id,
                Username = user.Username,
                Token = token
            });

        }

        [HttpPost("/login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto userLoginDto)
        {
            if (userLoginDto == null ||
                 string.IsNullOrEmpty(userLoginDto.Password) ||
                 string.IsNullOrEmpty(userLoginDto.Password))
            {
                return BadRequest("Please fill in all fields!");
            }

            if (!await _authRepository.CheckIfUserExistByUsernameOrEmail(userLoginDto.LoginString))
            {
                return NotFound("User not found!");
            }

            var user = await _authRepository.LoginUser(userLoginDto);

            if (!await _passwordHasher.CheckIfPasswordsAreEqual(userLoginDto.Password, user.PasswordHash))
            {
                return BadRequest("Username/email or password do not match!");
            }

            var token = await _tokenManager.CreateToken(user);

            return Ok(new LoggedInUserDto()
            {
                Id = user.Id,
                Username = user.Username,
                Token = token
            });
        }

        [HttpGet("/logout")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> LogoutUser()
        {
            var token = Request.Headers.Authorization.ToString();

            await _authRepository.LogoutUser(token);

            return NoContent();
        }
    }
}
