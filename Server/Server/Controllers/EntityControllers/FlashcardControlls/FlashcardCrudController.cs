using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Authentication;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Interfaces.EntityInterface;

namespace Server.Controllers.EntityControllers.FlashcardControlls
{
    [ApiController]
    [Route("api/flashcard")]
    [ServiceFilter(typeof(AuthFilter))]
    public class FlashcardCrudController : Controller
    {
        private readonly IFlashcardRepository _flashcardRepository;

        private readonly IDeckRepository _deckRepository;

        private readonly IMapper _mapper;

        public FlashcardCrudController(IFlashcardRepository flashcardRepository, IMapper mapper, IDeckRepository deckRepository)
        {
            _flashcardRepository = flashcardRepository;
            _deckRepository = deckRepository;
            _mapper = mapper;
        }
        [HttpGet("details/{flashCardId}")]
        public async Task<IActionResult> GetFlashcardDetails(int flashCardId)
        {

            if (!await _flashcardRepository.CheckIfFlashcardExists(flashCardId))
            {
                return NotFound(new string[] { "Invalid flashcard Id!" });
            }

            var flashcard = await _flashcardRepository.GetFlashcardById(flashCardId);

            var flashcardDto = _mapper.Map<FlashcardDetailsDto>(flashcard);
           
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            flashcardDto.isOwnedByUser = await _flashcardRepository.CheckIfUserOwnsTheFlashcard(userId, flashCardId);

            return Ok(flashcardDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateFlashcard([FromBody] FlashcardInfoDto flashcardInfoDto)
        {
            if (string.IsNullOrEmpty(flashcardInfoDto.Type) ||
                flashcardInfoDto.Type != "Text" && flashcardInfoDto.Type != "Image")
            {
                return BadRequest(new string[] { "Please specify a correct type!" });
            }

            Enum.TryParse(flashcardInfoDto.Type, out FlashcardType type);

            if (string.IsNullOrEmpty(flashcardInfoDto.Explanation) ||
                type == FlashcardType.Text &&
               string.IsNullOrEmpty(flashcardInfoDto.Definition))
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }

            if (!await _deckRepository.CheckIfDeckExists(flashcardInfoDto.DeckId))
            {
                return BadRequest(new string[] { "Deck does not exist!" });
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            await _flashcardRepository.CreateFlashcard(flashcardInfoDto, type, ownerId);

            return Ok(new string[] { "Successfully created!" });

        }
        [HttpPut("update/{flashcardId}")]

        public async Task<IActionResult> UpdateFlashcard(int flashcardId, [FromBody] FlashcardInfoDto flashcardInfoDto)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound(new string[] { "Flashcard with such id does not exist!" });
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _flashcardRepository.CheckIfUserOwnsTheFlashcard(ownerId, flashcardId))
            {
                return Unauthorized(new string[] { "U cannot modify this flashcard!" });
            }

            await _flashcardRepository.UpdateFlashcard(flashcardId, flashcardInfoDto);

            return Ok(new string[] { "Successfully updated!" });
        }

        [HttpDelete("delete/{flashcardId}")]

        public async Task<IActionResult> Delete(int flashcardId)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound(new string[] { "Flashcard with such id does not exist!" });
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _flashcardRepository.CheckIfUserOwnsTheFlashcard(ownerId, flashcardId))
            {
                return Unauthorized(new string[] { "U cannot delete this flashcard!" });
            }

            await _flashcardRepository.DeleteFlashcard(flashcardId);

            return Ok(new string[] { "Successfully deleted!" });
        }
    }

}

