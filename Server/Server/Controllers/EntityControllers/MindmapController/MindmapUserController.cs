using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.DTOs.MindmapDtos.Export;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Migrations;

namespace Server.Controllers.EntityControllers.MindmapController
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/mindmap/user")]
    public class MindmapUserController:Controller
    {
        private readonly IMindmapRepository _mindmapRepository;
        private readonly IMindmapUserRepository _mindmapUserRepository;
        private readonly IMapper _mapper;

        public MindmapUserController(IMindmapRepository mindmapRepository, IMindmapUserRepository mindmapUserRepository, IMapper mapper)
        {
            _mindmapRepository = mindmapRepository;
            _mindmapUserRepository = mindmapUserRepository;
            _mapper = mapper;
        }

        [HttpGet("get/liked")]
        public async Task<IActionResult> GetLikedMindmaps()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var likedMindmaps = await _mindmapUserRepository.GetLikedMindmaps(userId);

            var likedMindmapsDtos = _mapper.Map<List<MindmapDetailsDto>>(likedMindmaps);
           
            return Ok(likedMindmapsDtos);
        }

        [HttpGet("get/owned")]
        public async Task<IActionResult> GetOwnedMindmaps()
        {
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            var ownedMindmaps = await _mindmapUserRepository.GetOwnedMindmaps(userId);

            var ownedMindmapsDtos = _mapper.Map<List<MindmapDetailsDto>>(ownedMindmaps);

            return Ok(ownedMindmapsDtos);
        }
        [HttpGet("like/mindmap/{mindmapId}")]
        public async Task<IActionResult> LikeMindmap(int mindmapId)
        {
            if(! await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id{mindmapId} does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (await _mindmapUserRepository.CheckIfMindmapIsLikedByUser(mindmapId, userId))
            {
                return BadRequest(new string[] { "User has already liked mindmap!" });
            }

            if(await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return BadRequest(new string[] { "Owner cannot like the mindmap!" });
            }

            await _mindmapUserRepository.LikeMindmap(mindmapId, userId);

            return NoContent();
        }

        [HttpGet("dislike/mindmap/{mindmapId}")]
        public async Task<IActionResult> DisikeMindmap(int mindmapId)
        {
            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id{mindmapId} does not exist!" });
            }
            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _mindmapUserRepository.CheckIfMindmapIsLikedByUser(mindmapId, userId))
            {
                return BadRequest(new string[] { "User has not liked mindmap!" });
            }

            if (await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return BadRequest(new string[] { "Owner cannot like the mindmap!" });
            }

            await _mindmapUserRepository.DislikeMindmap(mindmapId, userId);

            return NoContent();
        }
    }
}
