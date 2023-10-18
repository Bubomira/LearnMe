﻿using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;
using Server.Repositories.EntityRepositories.DeckRepositories;


namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/note/tag")]
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

        [HttpPost("/note/attach/tag/{noteId}")]
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

            var tagId = (await _tagRepository.GetTagIds(new string[1] { tagName }))[0];

            if (await _noteTagRepository.CheckIfTagIsAttachedToNote(tagId, noteId))
            {
                return BadRequest("Tag is already attached to note!");
            }

            await _noteTagRepository.AttachTagToNote(new List<int>() { tagId }, noteId);

            return NoContent();
        }

        [HttpPost("/note/detach/tag/{noteId}")]

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
