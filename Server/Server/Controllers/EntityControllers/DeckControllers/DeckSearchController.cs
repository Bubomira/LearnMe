using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.Interfaces.EntityInterface;
using Server.Models;


namespace Server.Controllers.EntityControllers.DeckControllers
{
    [ApiController]
    [Route("api/search/deck")]
    public class DeckSearchController:Controller
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IDeckTagRepository _deckTagRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMapper _mapper;

        public DeckSearchController(IDeckRepository deckRepository, ITagRepository tagRepository, IDeckTagRepository deckTagRepository,IMapper mapper)
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
          
            var decks = await _deckTagRepository.SearchDecksByTag(tagName);
           
            var deckDtos = _mapper.Map<List<DeckPreviewDto>>(decks);

            return Ok(deckDtos);
        }
    }
}
