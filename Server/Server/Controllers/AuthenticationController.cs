using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;

namespace Server.Controllers
{
    [ApiController]
    [Route("learnMe/[controller]")]
    public class AuthenticationController:Controller
    {

        [ServiceFilter(typeof(AuthFilter))]
        [HttpGet("/register")]
        public async Task<IActionResult> RegisterUser()
        {
            return Ok();
        }
    }
}
