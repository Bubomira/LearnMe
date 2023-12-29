using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;

namespace Server.Controllers.EntityControllers
{
    [ApiController]
    [Route("api/events")]
    [ServiceFilter(typeof(AuthFilter))]
    public class EventController:Controller
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetUsersEvents()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var eventsJSON =await _eventRepository.GetEventsJSONByUserId(userId);

            return Ok(eventsJSON);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveUserEvents([FromBody] string inputUsersEventsJson)
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

             await _eventRepository.SaveEventsForCurrentUser(userId,inputUsersEventsJson);

            return NoContent();
        }
    }
}
