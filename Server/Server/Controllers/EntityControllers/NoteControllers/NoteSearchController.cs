using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Controllers.EntityControllers.NoteControllers
{
    [ApiController]
    [Route("api/note/search")]
    public class NoteSearchController:Controller
    {
        private readonly INoteRepository _noteRepository;
        private readonly INoteTagRepository _noteTagRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public NoteSearchController(INoteRepository noteRepository, INoteTagRepository noteTagRepository, ITagRepository tagRepository, IMapper mapper)
        {
            _noteRepository = noteRepository;
            _noteTagRepository = noteTagRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
        }
        [HttpPost("by/name")]
        public async Task<IActionResult> SearchNoteByTitle([FromBody] string searchString)
        {
            var notes  = await _noteRepository.SearchNotesByTitle(searchString);

            var notesDtos = _mapper.Map<List<NotePreviewDto>>(notes);

            return Ok(notesDtos);
        }

        [HttpPost("by/tag")]
        public async Task<IActionResult> SearchNoteByTag([FromBody] string tagName)
        {
            
            if(! await _tagRepository.CheckIfTagExistsByName(tagName))
            {
                return BadRequest("Cannot find anything with that tag!");
            }
            Tag tag = await _tagRepository.GetTagByName(tagName);

            var notes = await _noteTagRepository.SearchNotesByTag(tag.Id);

            var notesDtos = _mapper.Map<List<NotePreviewDto>>(notes);

            return Ok(notesDtos);
        }
    }
}
