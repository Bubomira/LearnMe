using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.Interfaces.EntityInterface;

namespace Server.Controllers.EntityControllers.FlashcardControlls
{
    [ApiController]
    [Route("api/flashcard/search")]
    public class FlashcardSearchController:Controller
    {
        private readonly IFlashcardRepository _flashcardRepository;
        private readonly IMapper _mapper;

        public FlashcardSearchController(IFlashcardRepository flashcardRepository, IMapper mapper)
        {
            _flashcardRepository = flashcardRepository;
            _mapper = mapper;
        }

        [HttpPost("by/name")]

        public async Task<IActionResult> SearchFlashcardByDefinition([FromBody] string searchString)
        {
            var flashcards = await _flashcardRepository.SearchFlashcardsByDefinition(searchString);

            var flashcardDtos = _mapper.Map<List<FlashcardDetailsDto>>(flashcards);

            return Ok(flashcardDtos);
        }
    }
}
