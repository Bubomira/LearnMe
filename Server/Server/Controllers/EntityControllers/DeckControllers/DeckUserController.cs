using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;

namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/deck/user")]
    public class DeckUserController : Controller
    {
        private readonly IDeckRepository _deckRepository;

        private readonly IDeckUserRepository _deckUserRepository;

        private readonly IMapper _mapper;
        public DeckUserController(IDeckRepository deckRepository, IDeckUserRepository deckUserRepository, IMapper mapper)
        {
            _deckRepository = deckRepository;
            _deckUserRepository = deckUserRepository;
            _mapper = mapper;
        }

        [HttpGet("like/deck/{deckId}")]
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

        [HttpGet("dislike/deck/{deckId}")]
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
        [HttpGet("get/ownedDecks")]
        public async Task<IActionResult> GetOwnedDecks()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var decks = await _deckUserRepository.GetOwnedDecks(userId);

            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var deckDtos = _mapper.Map<List<DeckPreviewDto>>(decks);

            return Ok(deckDtos);

        }

        [HttpGet("get/likedDecks")]
        public async Task<IActionResult> GetLikedDecks()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var decks = await _deckUserRepository.GetLikedDecks(userId);

            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var deckDtos = _mapper.Map<List<DeckPreviewDto>>(decks);

            return Ok(deckDtos);
        }
    }
}
