using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Authentication;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Interfaces.EntityInterface;

namespace Server.Controllers.EntityControllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlashcardCrudController : Controller
    {
        private readonly IFlashcardRepository _flashcardRepository;

        private readonly IMapper _mapper;

        public FlashcardCrudController(IFlashcardRepository flashcardRepository, IMapper mapper)
        {
            _flashcardRepository = flashcardRepository;
            _mapper = mapper;
        }
        [HttpGet("/details/{flashCardId}")]
        public async Task<IActionResult> GetFlashcardDetails(int flashCardId)
        {

            if (!await _flashcardRepository.CheckIfFlashcardExists(flashCardId))
            {
                return NotFound("Invalid flashcard Id!");
            }


            var flashcard = await _flashcardRepository.GetFlashcardById(flashCardId);

            var flashcardDto = _mapper.Map<FlashcardDetailsDto>(flashcard);

            return Ok(flashcardDto);
        }

        [HttpPost("/create")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> CreateFlashcard([FromBody] FlashcardInfoDto flashcardInfoDto)
        {
            if (string.IsNullOrEmpty(flashcardInfoDto.Type) ||
                flashcardInfoDto.Type != "Text" && flashcardInfoDto.Type != "Image")
            {
                return BadRequest("Please specify a correct type!");
            }

            Enum.TryParse(flashcardInfoDto.Type, out FlashcardType type);

            if (string.IsNullOrEmpty(flashcardInfoDto.Explanation) ||
                type == FlashcardType.Text &&
               string.IsNullOrEmpty(flashcardInfoDto.Definition))
            {
                return BadRequest("Please fill in all fields!");
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            await _flashcardRepository.CreateFlashcard(flashcardInfoDto, type, ownerId);

            return Ok("Successfully created!");

        }
        [HttpPut("/update/{flashcardId}")]
        [ServiceFilter(typeof(AuthFilter))]

        public async Task<IActionResult> UpdateFlashcard(int flashcardId, [FromBody] FlashcardInfoDto flashcardInfoDto)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound("Flashcard with such id does not exist!");
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _flashcardRepository.CheckIfUserOwnsTheFlashcard(ownerId, flashcardId))
            {
                return Unauthorized("U cannot modify this flashcard!");
            }

            await _flashcardRepository.UpdateFlashcard(flashcardId, flashcardInfoDto);

            return Ok("Successfully updated!");
        }

        [HttpDelete("/delete/{flashcardId}")]
        [ServiceFilter(typeof(AuthFilter))]

        public async Task<IActionResult> Delete(int flashcardId)
        {
            if (!await _flashcardRepository.CheckIfFlashcardExists(flashcardId))
            {
                return NotFound("Flashcard with such id does not exist!");
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _flashcardRepository.CheckIfUserOwnsTheFlashcard(ownerId, flashcardId))
            {
                return Unauthorized("U cannot delete this flashcard!");
            }

            await _flashcardRepository.DeleteFlashcard(flashcardId);

            return Ok("Successfully deleted!");
        }
    }

}

