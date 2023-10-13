using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
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

        [HttpGet("/detailsDeck/{deckId}")]
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
        [HttpPost("/createDeck")]
        [ServiceFilter(typeof(AuthFilter))]
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

            return Ok("The deck has succesfully been created!");
        }

        [HttpPut("/updateDeck/{deckId}")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> UpdateDeck([FromBody] string newDeckName, int deckId)
        {
            if (string.IsNullOrEmpty(newDeckName))
            {
                return BadRequest("Incorrect name format!");
            }
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound($"Deck with {deckId} does not exist!");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Unauthorized("You cannot modify this deck!");
            }

            await _deckRepository.UpdateDeck(deckId, newDeckName);

            return Ok();

        }
        [HttpDelete("/deleteDeck/{deckId}")]
        public async Task<IActionResult> DeleteDeck(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound($"Deck with {deckId} does not exist!");
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Unauthorized("You cannot delete this deck!");
            }
            await _deckRepository.DeleteDeck(deckId);

            return NoContent();
        }
    }
}
