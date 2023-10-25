using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Models;

namespace Server.Controllers.EntityControllers.DeckControllers
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

        [HttpGet("details/{deckId}")]
        public async Task<IActionResult> GetDeckDetails(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { "The deck does not exist!" });
            }
            var deck = await _deckRepository.GetDeckDetails(deckId);

            var deckDto = _mapper.Map<DeckDetailsDto>(deck);

            return Ok(deckDto);
        }
        [HttpPost("create")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> CreateDeck([FromBody] DeckInfoDto deckInfoDto)
        {
            if (string.IsNullOrEmpty(deckInfoDto.Name) ||
                deckInfoDto.Tags.Length == 0)
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var deck = await _deckRepository.CreateDeck(deckInfoDto, ownerId);

            var tagIds = await _tagRepository.GetTagIds(deckInfoDto.Tags);

            await _decktagRepository.AttachTagToDeck(tagIds, deck.Id);

            var deckDto = _mapper.Map<DeckPreviewDto>(deck);
            return Ok(deckDto);
        }

        [HttpPut("update/{deckId}")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> UpdateDeck([FromBody] string newDeckName, int deckId)
        {
            if (string.IsNullOrEmpty(newDeckName))
            {
                return BadRequest(new string[] { "Incorrect name format!" });
            }
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { $"Deck with {deckId} does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Unauthorized(new string[] { "You cannot modify this deck!" });
            }

            await _deckRepository.UpdateDeck(deckId, newDeckName);

            return Ok(new string[] { "Successfully updated deck!" });

        }
        [HttpDelete("delete/{deckId}")]
        public async Task<IActionResult> DeleteDeck(int deckId)
        {
            if (!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound(new string[] { $"Deck with {deckId} does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _deckRepository.CheckIfDeckIsOwnedByUser(deckId, userId))
            {
                return Unauthorized(new string[] { "You cannot delete this deck!" });
            }
            await _deckRepository.DeleteDeck(deckId);

            return Ok(new string[] { "Successfully deleted deck!" });
        }
    }
}
