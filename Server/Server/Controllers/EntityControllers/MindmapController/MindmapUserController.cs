using Microsoft.AspNetCore.Mvc;
using Server.Authentication;

namespace Server.Controllers.EntityControllers.MindmapController
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/mindmap/user")]
    public class MindmapUserController:Controller
    {
    }
}
