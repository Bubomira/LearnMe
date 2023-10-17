using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.Interfaces.EntityInterface.INotesRepositories;


namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/[controller]")]
    public class NoteUserController : Controller
    {
        private readonly INoteRepository _noteRepository;
        private readonly INoteUserRepository _noteUserRepository;
        private readonly IMapper _mapper;
        public NoteUserController(INoteUserRepository noteUserRepository, INoteRepository noteRepository, IMapper mapper)
        {
            _noteRepository = noteRepository;
            _noteUserRepository = noteUserRepository;
            _mapper = mapper;
        }

        [HttpGet("/like/note/{noteId}")]
        public async Task<IActionResult> LikeNote(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound($"Note with id {noteId} does not exist");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (await _noteRepository.CheckIfNoteIsOwnedByUser(noteId, userId))
            {
                return Forbid("You cannot like your own note!");
            }

            if (await _noteUserRepository.CheckIfNoteIsLikedByUser(noteId, userId))
            {
                return BadRequest("You have already liked this note!");
            }

            await _noteUserRepository.LikeNote(noteId, userId);

            return NoContent();
        }

        [HttpGet("/dislike/note/{noteId}")]
        public async Task<IActionResult> DislikeNote(int noteId)
        {
            if (!await _noteRepository.CheckIfNoteExists(noteId))
            {
                return NotFound($"Note with id {noteId} does not exist");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _noteUserRepository.CheckIfNoteIsLikedByUser(noteId, userId))
            {
                return BadRequest("You cannot dislike a note you have not liked!");
            }

            await _noteUserRepository.DislikeNote(noteId, userId);

            return NoContent();
        }

        [HttpGet("/get/liked/notes")]
        public async Task<IActionResult> GetLikedNotes()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var notes = await _noteUserRepository.GetLikedNotes(userId);

            var notesDto = _mapper.Map<List<NotePreviewDto>>(notes);

            return Ok(notesDto);

        }

        [HttpGet("/get/owned/notes")]
        public async Task<IActionResult> GetOwnedNotes()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var notes = await _noteUserRepository.GetOwnedNotes(userId);

            var notesDto = _mapper.Map<List<NotePreviewDto>>(notes);

            return Ok(notesDto);

        }
    }
}
