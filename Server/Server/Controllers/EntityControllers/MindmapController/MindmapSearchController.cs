using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs.MindmapDtos.Export;
using Server.DTOs.MindmapDtos.Import;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Models;

namespace Server.Controllers.EntityControllers.MindmapController
{
    [ApiController]
    [Route("api/search/mindmap")]
    public class MindmapSearchController : Controller
    {
        private readonly IMindmapRepository _mindmapRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMindmapTagRepository _mindmapTagRepository;
        private readonly IMapper _mapper;

        public MindmapSearchController(IMindmapRepository mindmapRepository, ITagRepository tagRepository, IMindmapTagRepository mindmapTagRepository, IMapper mapper)
        {
            _mindmapRepository = mindmapRepository;
            _tagRepository = tagRepository;
            _mindmapTagRepository = mindmapTagRepository;
            _mapper = mapper;
        }

        [HttpPost("by/name")]
        public async Task<IActionResult> SearchMindmapByName([FromBody] string searchString)
        {
           var mindmaps =  await _mindmapRepository.SearchMindmapsByName(searchString);

           var mindmapDtos =  _mapper.Map<List<MindmapPreviewDto>>(mindmaps);

           return Ok(mindmapDtos);
        }

        [HttpPost("by/tag")]
        public async Task<IActionResult> SearchMindmapByTag([FromBody] string tagName)
        {

            var mindmaps = await _mindmapTagRepository.SearchMindmapsByTag(tagName);

            var mindmapsDtos = _mapper.Map<List<MindmapPreviewDto>>(mindmaps);

            return Ok(mindmapsDtos);
        }
    }
}
