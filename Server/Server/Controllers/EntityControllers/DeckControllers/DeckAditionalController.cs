using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Models;

namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class DeckAditionalController : Controller
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IDeckTagRepository _deckTagRepository;
        private readonly ITagRepository _tagRepository;

        public DeckAditionalController(IDeckRepository deckRepository, IDeckTagRepository deckTagRepository, ITagRepository tagRepository)
        {
            _deckRepository = deckRepository;
            _deckTagRepository = deckTagRepository;
            _tagRepository = tagRepository;
        }

        [HttpPost("attach/tag/{deckId}")]
        public async Task<IActionResult> AddTagToDeck([FromBody] string tagName, int deckId)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                return BadRequest("Please fill in valid tag name!");
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("Deck does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Forbid("You cannot modify this deck!");
            }

            Tag tag;

            if (!await _tagRepository.CheckIfTagExistsByName(tagName))
            {
                tag = await _tagRepository.CreateTag(tagName);
            }
            else
            {
                tag = await _tagRepository.GetTagByName(tagName);
            }

            if (await _deckTagRepository.CheckIfTagIsAttachedToDeck(deckId, tag.Id))
            {
                return BadRequest("Tag is already attached to deck!");
            }

            await _deckTagRepository.AttachTagToDeck(tag.Id, deckId);

            return NoContent();
        }

        [HttpPost("remove/tag/{deckId}")]
        public async Task<IActionResult> RemoveTagFromDeck([FromBody] int tagId, int deckId)
        {
            if (!await _tagRepository.CheckIfTagExistsById(tagId))
            {
                return BadRequest("Tag does not exist!");
            }

            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("Deck does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Forbid("You cannot modify this deck!");
            }

            if (!await _deckTagRepository.CheckIfTagIsAttachedToDeck(deckId, tagId))
            {
                return BadRequest("Tag is not attached to deck!");
            }

            await _deckTagRepository.DetachTagFromDeck(tagId, deckId);

            return NoContent();
        }
    }
}
