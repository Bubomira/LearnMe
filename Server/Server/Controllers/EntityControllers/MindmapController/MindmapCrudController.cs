using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.DeckDtos.ImportDtos;
using Server.DTOs.MindmapDtos.Export;
using Server.DTOs.MindmapDtos.Import;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Models;

namespace Server.Controllers.EntityControllers.MindmapController
{
    [ApiController]
    [Route("api/mindmap")]

    [ServiceFilter(typeof(AuthFilter))]
    public class MindmapCrudController : Controller
    {
        private readonly IMindmapRepository _mindmapRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMindmapTagRepository _mindmapTagRepository;
        private readonly IMindmapUserRepository _mindmapUserRepository;
        private readonly IMapper _mapper;
        public MindmapCrudController(IMindmapRepository mindmapRepository, IMapper mapper, IMindmapTagRepository mindmapTagRepository, ITagRepository tagRepository,IMindmapUserRepository mindmapUserRepository)
        {
            _mindmapTagRepository = mindmapTagRepository;
            _mindmapRepository = mindmapRepository;
            _tagRepository = tagRepository;
            _mapper = mapper;
            _mindmapUserRepository = mindmapUserRepository;
        }

        [HttpGet("details/{mindmapId}")]
        public async Task<IActionResult> GetMindmapDetails(int mindmapId)
        {
            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }
            var mindmap = await _mindmapRepository.GetMindmapDetails(mindmapId);

            var mindmapDto = _mapper.Map<MindmapDetailsDto>(mindmap);

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            mindmapDto.isOwnedByUser = userId == mindmap.OwnerId;
            mindmapDto.isLikedByUser = await _mindmapUserRepository.CheckIfMindmapIsLikedByUser(mindmapId,userId);

            return Ok(mindmapDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateMindmap([FromBody] MindmapInfoDto mindmapInfoDto)
        {
            if (string.IsNullOrEmpty(mindmapInfoDto.Name)
                || mindmapInfoDto.Tags.Length == 0)
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }
            var tagIds = await _tagRepository.GetTagIds(mindmapInfoDto.Tags);

            int ownerId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var mindmap = await _mindmapRepository.CreateMindmap(mindmapInfoDto, ownerId);

            await _mindmapTagRepository.AttachTagsToMindmap(tagIds, mindmap.Id);

            var mindmapDto = _mapper.Map<MindmapDetailsDto>(mindmap);

            return Ok(mindmapDto);
        }

        [HttpPut("update/{mindmapId}")]
        public async Task<IActionResult> UpdateMindmap([FromBody] string newName, int mindmapId)
        {
            if (string.IsNullOrEmpty(newName))
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }

            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return Forbid(new string[] { "You cannot midify this mindmap!" });
            }

            await _mindmapRepository.UpdateMindmap(mindmapId, newName);

            return NoContent();

        }
        [HttpPut("save/{mindmapId}")]
        public async Task<IActionResult> SaveMindmapDiagram([FromBody] string jsonDiagram,int mindmapId)
        {
            if (string.IsNullOrEmpty(jsonDiagram))
            {
                return BadRequest(new string[] { "Please fill in all fields!" });
            }

            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return Forbid(new string[] { "You cannot midify this mindmap!" });
            }

            await _mindmapRepository.SaveMindmapJSONDiagram(mindmapId, jsonDiagram);

            return NoContent();
        }

        [HttpDelete("delete/{mindmapId}")]

        public async Task<IActionResult> DeleteMindmap(int mindmapId)
        {

            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return Forbid(new string[] { "You cannot midify this mindmap!" });
            }

            await _mindmapRepository.DeleteMindmap(mindmapId);

            return NoContent();

        }

    }
}
