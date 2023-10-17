using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;
using Server.Repositories.EntityRepositories.DeckRepositories;

namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class NoteTagController : Controller
    {
        private readonly INoteTagRepository _noteTagRepository;
        private readonly INoteRepository _noteRepository;
        private readonly ITagRepository _tagRepository;

        public NoteTagController(INoteTagRepository noteTagRepository, ITagRepository tagRepository, INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
            _noteTagRepository = noteTagRepository;
            _tagRepository = tagRepository;
        }

        [HttpPost("/attach/tag/{noteId}")]
        public async Task<IActionResult> AttachNoteToTag([FromBody] string tagName, int noteId)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                return BadRequest("Tag name is empty");
            }

            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound($"Note with id {noteId} does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid("You cannot modify this note!");
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

            if (await _noteTagRepository.CheckIfTagIsAttachedToNote(tag.Id, noteId))
            {
                return BadRequest("Tag is already attached to note!");
            }

            await _noteTagRepository.AttachTagToNote(new List<int>() { tag.Id }, noteId);

            return NoContent();
        }

        [HttpPost("/detach/tag/{noteId}")]

        public async Task<IActionResult> DetachTagFromNote([FromBody] int tagId, int noteId)
        {
            if (!await _tagRepository.CheckIfTagExistsById(tagId))
            {
                return NotFound("Invalid tag id!");
            }
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound("Note does not exist!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid("You cannot remove this tag!");
            }

            if (!await _noteTagRepository.CheckIfTagIsAttachedToNote(tagId, noteId))
            {
                return BadRequest("Tag is not attached to note!");
            }

            await _noteTagRepository.DetachTagFromNote(tagId, noteId);

            return NoContent();

        }
    }
}
