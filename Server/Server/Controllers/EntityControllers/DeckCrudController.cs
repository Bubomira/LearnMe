using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.Interfaces.EntityInterface;

namespace Server.Controllers.EntityControllers
{
    [ApiController]
    [Route("api/deck")]
    public class DeckCrudController : Controller
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IMapper _mapper;
        public DeckCrudController(IDeckRepository deckRepository, IMapper mapper)
        {
            _deckRepository = deckRepository;
            _mapper = mapper;
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDeckDetails(int deckId)
        {
            if(!await _deckRepository.CheckIfDeckExists(deckId))
            {
                return NotFound("The deck does not exist!");
            }
            var deck = await _deckRepository.GetDeckDetails(deckId);

            var deckDto = _mapper.Map<DeckDetailsDto>(deck);

            return Ok(deckDto);

        }
    }
}
