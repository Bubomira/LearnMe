using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Authentication;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ImportDtos;
using Server.Enums;
using Server.Interfaces.FlashcardInterfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlashcardController : Controller
    {
        private readonly IFlashcardRepository _flashcardRepository;

        private readonly IMapper _mapper;

        public FlashcardController(IFlashcardRepository flashcardRepository, IMapper mapper)
        {
            _flashcardRepository = flashcardRepository;
            _mapper = mapper;
        }
        [HttpGet("/flashcard/details/{flashCardId}")]
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

        [HttpPost("/flashcard/create")]
        [ServiceFilter(typeof(AuthFilter))]
        public async Task<IActionResult> CreateFlashcard([FromBody] FlashcardInfoDto flashcardInfoDto)
        {
            if (string.IsNullOrEmpty(flashcardInfoDto.Type) ||
                flashcardInfoDto.Type != "Text" && flashcardInfoDto.Type != "Image")
            {
                return BadRequest("Please specify a correct type!");
            }

            Enum.TryParse(flashcardInfoDto.Type, out FlashcardType type);

            if (string.IsNullOrEmpty(flashcardInfoDto.Definition) ||
                (type == FlashcardType.Text &&
               string.IsNullOrEmpty(flashcardInfoDto.Explanation)))
            {
                return BadRequest("Please fill in all fields!");
            }

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            await _flashcardRepository.CreateFlashcard(flashcardInfoDto, type, ownerId);

            return Ok();

        }

    }
}
