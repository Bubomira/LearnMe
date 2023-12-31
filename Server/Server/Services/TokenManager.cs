﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.Interfaces.ServiceInterfaces;
using Server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace Server.Services
{
    public class TokenManager : ITokenManager
    {
        private readonly SymmetricSecurityKey _key;
        private readonly SigningCredentials _signingCredentials;
        private readonly IConfiguration _configuration;
        private readonly LearnMeDbContext _learnMeDbContext;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        public TokenManager(IConfiguration config, LearnMeDbContext learnMeDbContext)
        {
            _configuration = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            _signingCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256);
            _learnMeDbContext = learnMeDbContext;
            _jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        }
        public async Task<string> CreateToken(User user)
        {
            var claims = new[]
          {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email,user.Email)
            };

            var token = new JwtSecurityToken(
                //to do: add issuer and audience
                null,
                null,
                claims,
                expires: DateTime.Now.AddDays(2),
                signingCredentials: _signingCredentials);

            string verifyedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return verifyedToken;
        }

        public async Task BlackListToken(string token)
        {
            InvalidToken invalidToken = new InvalidToken()
            {
                ValueOfInvalidToken = token
            };
            await _learnMeDbContext.InvalidTokens.AddAsync(invalidToken);
            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<bool> CheckIfTokenIsBlacklisted(string token)
        {
            return _learnMeDbContext.InvalidTokens.AnyAsync(x => x.ValueOfInvalidToken == token);
        }

        public async Task<bool> CheckIfTokenIsValid(string tokenToBeChecked)
        {
            var tokenValidationParameters = await GetTokenParameters();

            var result = await _jwtSecurityTokenHandler
                .ValidateTokenAsync(tokenToBeChecked, tokenValidationParameters);

            return result.IsValid;

        }
        public async Task<IDictionary<string, object>> DesipherToken(string token)
        {
            var tokenValidationParameters = await GetTokenParameters();

            var result = await _jwtSecurityTokenHandler
                .ValidateTokenAsync(token, tokenValidationParameters);

            return result.Claims;
        }

        private async Task<TokenValidationParameters> GetTokenParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = false,
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidIssuer = null,
                ValidAudience = null,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])) // The same key as the one that generate the token
            };
        }
    }
}
