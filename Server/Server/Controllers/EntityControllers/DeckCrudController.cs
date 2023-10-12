using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Models;

namespace Server.Controllers.EntityControllers
{
    [ApiController]
    [Route("api/deck")]
    public class DeckCrudController : Controller
    {
        private readonly IDeckRepository _deckRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IDeckTagRepository _decktagRepository;
        private readonly IMapper _mapper;
        public DeckCrudController(IDeckRepository deckRepository, IMapper mapper, ITagRepository tagRepository, IDeckTagRepository decktagRepository)
        {
            _deckRepository = deckRepository;
            _mapper = mapper;
            _tagRepository = tagRepository;
            _decktagRepository = decktagRepository;
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDeckDetails(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("The deck does not exist!");
            }
            var deck = await _deckRepository.GetDeckDetails(deckId);

            var deckDto = _mapper.Map<DeckDetailsDto>(deck);

            return Ok(deckDto);
        }
        [HttpPost("/create")]
        public async Task<IActionResult> GetDeckDetails([FromBody] DeckInfoDto deckInfoDto)
        {
            if (string.IsNullOrEmpty(deckInfoDto.Name) ||
                deckInfoDto.Tags.Length == 0)
            {
                return BadRequest("Please fill in all fields!");
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var deck = await _deckRepository.CreateDeck(deckInfoDto, ownerId);

            List<int> tagIds = new List<int>();

            foreach (var tagName in deckInfoDto.Tags)
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
            await _decktagRepository.AttachTagsToDeck(tagIds, deck.Id);

            return Ok();
        }
    }
}
