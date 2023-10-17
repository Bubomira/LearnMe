using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Server.Authentication;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.DTOs.NoteDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteCrudController : Controller
    {
        private readonly INoteRepository _noteRepository;
        private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;
        private readonly INoteTagRepository _noteTagRepository;
        public NoteCrudController(INoteRepository noteRepository, IMapper mapper, ITagRepository tagRepository, INoteTagRepository noteTagRepository)
        {
            _noteRepository = noteRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
            _noteTagRepository = noteTagRepository;
        }

        [HttpGet("/note/details/{noteId}")]
        public async Task<IActionResult> GetNoteDetails(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound("Note does not exist!");
            }
            var note = await _noteRepository.GetNotesDetails(noteId);

            var noteDto = _mapper.Map<NoteDetailsDto>(note);

            return Ok(noteDto);
        }
        [HttpPost("/note/create")]
        [ServiceFilter(typeof(AuthFilter))]

        public async Task<IActionResult> CreateNote([FromBody] NoteInfoDto noteInfoDto)
        {
            if (noteInfoDto == null || string.IsNullOrEmpty(noteInfoDto.Content)
                || noteInfoDto.Tags.Length == 0 || string.IsNullOrEmpty(noteInfoDto.Title))
            {
                return BadRequest("Please fill in all fields!");
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            List<int> tagIds = new List<int>();

            foreach (var tagName in noteInfoDto.Tags)
            {
                Tag tag;
                if (!await _tagRepository.CheckIfTagExistsByName(tagName))
                {
                    tag = await _tagRepository.CreateTag(tagName);
                }
                else
                {
                    tag = await _tagRepository.GetTagByName(tagName);
                }
                tagIds.Add(tag.Id);
            }

            var note = await _noteRepository.CreateNote(noteInfoDto, userId);

            await _noteTagRepository.AttachTagToNote(tagIds, note.Id);

            return Ok();
        }

        [HttpPut("/note/update/{noteId}")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> UpdateNote([FromBody] NoteUpdateDto noteUpdateDto, int noteId)
        {
            if (string.IsNullOrEmpty(noteUpdateDto.Content) || string.IsNullOrEmpty(noteUpdateDto.Title))
            {
                return BadRequest("Please fill in all fields!");
            }
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound("Note does not exist!");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid("You canot modify this note!");
            }

            await _noteRepository.UpdateNote(noteUpdateDto, noteId);
            return NoContent();
        }

        [HttpDelete("/note/delete/{noteId}")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound("Note does not exist!");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid("You canot delete this note!");
            }

            await _noteRepository.DeleteNote(noteId);
            return NoContent();
        }
    }
}
