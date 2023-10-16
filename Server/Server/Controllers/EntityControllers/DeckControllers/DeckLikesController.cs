using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;

namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class DeckLikesController : Controller
    {
        private readonly IDeckRepository _deckRepository;

        private readonly IDeckUserRepository _deckUserRepository;
        public DeckLikesController(IDeckRepository deckRepository, IDeckUserRepository deckUserRepository)
        {
            _deckRepository = deckRepository;
            _deckUserRepository = deckUserRepository;
        }

        [HttpGet("/like/deck/{deckId}")]
        public async Task<IActionResult> LikeDeck(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("Deck does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Forbid("You cannot like your own deck!");
            }

            if (await _deckUserRepository.CheckIfDeckIsLikedByUser(deckId, userId))
            {
                return Forbid("You cannot like this deck twice!");
            }

            await _deckUserRepository.LikeDeck(deckId, userId);

            return Ok($"Successfully liked deck {deckId}!");
        }

        [HttpGet("/dislike/deck/{deckId}")]
        public async Task<IActionResult> Dislike(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("Deck does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckUserRepository.CheckIfDeckIsLikedByUser(deckId, userId))
            {
                return Forbid("You cannot dislike this deck!");
            }

            await _deckUserRepository.DislikeDeck(deckId, userId);

            return Ok($"Successfully disliked deck {deckId}!");
        }
    }
}
