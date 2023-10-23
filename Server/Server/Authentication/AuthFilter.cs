using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Server.Interfaces.ServiceInterfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Server.Authentication
{
    public class AuthFilter : IAsyncAuthorizationFilter
    {
        private readonly IConfiguration _configuration;
        public AuthFilter(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue("Authorization",
                out var extractedApiKey))
            {
                context.Result = new UnauthorizedObjectResult(new string[] { "Authorization header is missing!" });
                return;
            }

            string token = context.HttpContext.Request.Headers.Authorization.ToString();
          

            var _tokenChecker = context.HttpContext.
                  RequestServices.GetService<ITokenManager>();

            if (!await _tokenChecker.CheckIfTokenIsValid(token))
            {
                context.Result = new UnauthorizedObjectResult(new string[]{"The token is invalid!"});
                return;
            }

            if (await _tokenChecker.CheckIfTokenIsBlacklisted(token))
            {
                context.Result = new UnauthorizedObjectResult(new string[] { "The token is blacklisted!" });
                return;
            }
            context.HttpContext.Items.Add("userData", await _tokenChecker.DesipherToken(token));
        }
    }
}
