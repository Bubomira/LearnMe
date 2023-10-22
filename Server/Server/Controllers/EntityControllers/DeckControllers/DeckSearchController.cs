using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.Models;
using Server.Repositories.EntityRepositories;
using Server.Repositories.EntityRepositories.DeckRepositories;

namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ApiController]
    [Route("api/deck/search")]
    public class DeckSearchController:Controller
    {
        private readonly DeckRepository _deckRepository;
        private readonly DeckTagRepository _deckTagRepository;
        private readonly TagRepository _tagRepository;
        private readonly IMapper _mapper;

        public DeckSearchController(DeckRepository deckRepository, TagRepository tagRepository, DeckTagRepository deckTagRepository,IMapper mapper)
        {
            _deckRepository = deckRepository;
            _tagRepository = tagRepository;
            _deckTagRepository = deckTagRepository;
            _mapper = mapper;
        }

        [HttpPost("by/name")]
        public async Task<IActionResult> SearchDeckByName([FromBody]string searchString)
        {
            var decks = await _deckRepository.SearchDeckByName(searchString);
            
            var deckDtos = _mapper.Map<List<DeckPreviewDto>> (decks);

            return Ok(deckDtos);
        }

        [HttpPost("by/tag")]
        public async Task<IActionResult> SearchDeckByTag([FromBody] string tagName)
        {
            if(!await _tagRepository.CheckIfTagExistsByName(tagName))
            {
                return NotFound(new string[] { "Nothing using this tag has been found!" });
            }

            Tag tag = await _tagRepository.GetTagByName(tagName);

            var decks = await _deckTagRepository.SearchDecksByTag(tag.Id);
           
            var deckDtos = _mapper.Map<List<DeckPreviewDto>>(decks);

            return Ok(deckDtos);
        }
    }
}
