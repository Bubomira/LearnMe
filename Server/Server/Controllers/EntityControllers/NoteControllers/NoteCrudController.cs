using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Server.Authentication;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.DTOs.NoteDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ApiController]
    [Route("api/note")]
    [ServiceFilter(typeof(AuthFilter))]
    public class NoteCrudController : Controller
    {
        private readonly INoteRepository _noteRepository;
        private readonly IMapper _mapper;
        private readonly ITagRepository _tagRepository;
        private readonly INoteTagRepository _noteTagRepository;
        private readonly INoteUserRepository _noteUserRepository;
        public NoteCrudController(INoteRepository noteRepository, IMapper mapper, ITagRepository tagRepository, INoteTagRepository noteTagRepository, INoteUserRepository noteUserRepository)
        {
            _noteRepository = noteRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
            _noteTagRepository = noteTagRepository;
            _noteUserRepository = noteUserRepository;
        }

        [HttpGet("details/{noteId}")]
        public async Task<IActionResult> GetNoteDetails(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound(new string[] { "Note does not exist!" });
            }
            var note = await _noteRepository.GetNotesDetails(noteId);

            var noteDto = _mapper.Map<NoteDetailsDto>(note);

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            noteDto.isOwnedByUser = userId == note.OwnerId;

            noteDto.isLikedByUser = await _noteUserRepository.CheckIfNoteIsLikedByUser(noteId, userId);

            return Ok(noteDto);
        }
        [HttpPost("create")]
        

        public async Task<IActionResult> CreateNote([FromBody] NoteInfoDto noteInfoDto)
        {
            if (noteInfoDto == null || string.IsNullOrEmpty(noteInfoDto.Content)
                || noteInfoDto.Tags.Length == 0 || string.IsNullOrEmpty(noteInfoDto.Title))
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }
          
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());
          
            var tagIds = await _tagRepository.GetTagIds(noteInfoDto.Tags);

            var note = await _noteRepository.CreateNote(noteInfoDto, userId);

            await _noteTagRepository.AttachTagToNote(tagIds, note.Id);

            return Ok();
        }

        [HttpPut("update/{noteId}")]
        public async Task<IActionResult> UpdateNote([FromBody] NoteUpdateDto noteUpdateDto, int noteId)
        {
            if (string.IsNullOrEmpty(noteUpdateDto.Content) || string.IsNullOrEmpty(noteUpdateDto.Title))
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound(new string[] { "Note does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid(new string[] { "You canot modify this note!" });
            }

            await _noteRepository.UpdateNote(noteUpdateDto, noteId);
            return NoContent();
        }

        [HttpDelete("delete/{noteId}")]
        public async Task<IActionResult> DeleteNote(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound(new string[] { "Note does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid(new string[] { "You canot delete this note!" });
            }

            await _noteRepository.DeleteNote(noteId);
            return NoContent();
        }
    }
}
