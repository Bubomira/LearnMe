using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Models;

namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/deck/additional")]
    public class DeckAditionalController : Controller
    {
        private readonly IDeckRepository _deckRepository;

        private readonly IDeckTagRepository _deckTagRepository;
        private readonly ITagRepository _tagRepository;

        private readonly IFlashcardRepository _flashcardRepository;
        private readonly IDeckFlashcardRepository _deckFlashcardRepository;

        public DeckAditionalController(IDeckRepository deckRepository, IDeckTagRepository deckTagRepository, ITagRepository tagRepository, IFlashcardRepository flashcardRepository, IDeckFlashcardRepository deckFlashcardRepository)
        {
            _deckRepository = deckRepository;
            _deckTagRepository = deckTagRepository;
            _tagRepository = tagRepository;
            _flashcardRepository = flashcardRepository;
            _deckFlashcardRepository = deckFlashcardRepository;
        }

        [HttpPost("attach/tag/{deckId}")]
        public async Task<IActionResult> AddTagToDeck([FromBody] string tagName, int deckId)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                return BadRequest(new string[] { "Please fill in valid tag name!" });
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { "Deck does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Forbid(new string[] { "You cannot modify this deck!" });
            }

            var tagId =( await _tagRepository.GetTagIds(new string[1] { tagName }))[0];

            if (await _deckTagRepository.CheckIfTagIsAttachedToDeck(deckId, tagId))
            {
                return BadRequest(new string[] { "Tag is already attached to deck!" });
            }

            await _deckTagRepository.AttachTagToDeck(new List<int>() { tagId }, deckId);

            return NoContent();
        }

        [HttpPost("detach/tag/{deckId}")]
        public async Task<IActionResult> RemoveTagFromDeck([FromBody] int tagId, int deckId)
        {
            if (!await _tagRepository.CheckIfTagExistsById(tagId))
            {
                return BadRequest(new string[] { "Tag does not exist!" });
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { "Deck does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Forbid(new string[] { "You cannot modify this deck!" });
            }

            if (!await _deckTagRepository.CheckIfTagIsAttachedToDeck(tagId, deckId))
            {
                return BadRequest(new string[] { "Tag is not attached to deck!" });
            }

            await _deckTagRepository.DetachTagFromDeck(tagId, deckId);

            return NoContent();
        }

        [HttpPost("attach/flashcard/deck/{deckId}")]
        public async Task<IActionResult> AttachFlashcardToDesk([FromBody] int flashcardId, int deckId)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound(new string[] { "Flashcard does not exist!" });
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { "Deck does not exist!" });
            }

            if (await _deckFlashcardRepository.CheckIfFlashcardIsAttachedToDeck(flashcardId, deckId))
            {
                return BadRequest(new string[] { "Flashcard is already attached to the deck!" });
            }

            await _deckFlashcardRepository.AttachFlashcardToDeck(flashcardId, deckId);

            return NoContent();
        }

        [HttpPost("remove/flashcard/from/deck/{deckId}")]

        public async Task<IActionResult> RemoveFlashcardFromDeck([FromBody] int flashcardId, int deckId)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound(new string[] { "Flashcard does not exist!" });
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { "Deck does not exist!" });
            }

            if (!await _deckFlashcardRepository.CheckIfFlashcardIsAttachedToDeck(flashcardId, deckId))
            {
                return BadRequest(new string[] { "Flashcard is not attached to the deck!" });
            }

            await _deckFlashcardRepository.RemoveFlashcardFromDeck(flashcardId, deckId);

            return NoContent();
        }
    }
}
