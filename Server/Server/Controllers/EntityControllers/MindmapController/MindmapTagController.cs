using Microsoft.AspNetCore.Mvc;
using Server.Authentication;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IMindmapRepository;

namespace Server.Controllers.EntityControllers.MindmapController
{
    [ServiceFilter(typeof(AuthFilter))]
    [ApiController]
    [Route("api/mindmap/tag")]
    public class MindmapTagController:Controller
    {
        private readonly IMindmapTagRepository _mindmapTagRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IMindmapRepository _mindmapRepository;

        public MindmapTagController(IMindmapTagRepository mindmapTagRepository, ITagRepository tagRepository, IMindmapRepository mindmapRepository)
        {
            _mindmapTagRepository = mindmapTagRepository;
            _tagRepository = tagRepository;
            _mindmapRepository = mindmapRepository;
        }

        [HttpPost("attach/tag/{mindmapId}")]
        public async Task<IActionResult> AttachTagToMindmap([FromBody] string tagName,int mindmapId)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                return BadRequest(new string[] { "Please fill in valid tag name!" });
            }

            if(!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (! await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return Forbid(new string[] { "You cannot modify this mindmap!" });
            }

            var tagId = (await _tagRepository.GetTagIds(new string[1] { tagName }))[0];

            if(await _mindmapTagRepository.CheckIfTagIsAttachedToMindmap(mindmapId, userId))
            {
                return BadRequest(new string[] { "Tag is already attached to mindmap!" });
            }

            await _mindmapTagRepository.AttachTagsToMindmap(new List<int>() { tagId}, mindmapId);

            return NoContent();
        }


        [HttpPost("detach/tag/{mindmapId}")]
        public async Task<IActionResult> DetachTagFromMindmap([FromBody] int tagId, int mindmapId)
        {

            if (!await _mindmapRepository.CheckIfMindmapExists(mindmapId))
            {
                return NotFound(new string[] { $"Mindmap with id {mindmapId} does not exist!" });
            }

            int userId = int.Parse(((Dictionary<string, object>)HttpContext.Items["userData"]).FirstOrDefault().Value.ToString());

            if (!await _mindmapRepository.CheckIfMindmapIsOwnedByUser(mindmapId, userId))
            {
                return Forbid(new string[] { "You cannot modify this mindmap!" });
            }

            if(!await _tagRepository.CheckIfTagExistsById(tagId))
            {
                return NotFound(new string[] { $"Tag with id {tagId} does not exist!" });
            }
         
            if (await _mindmapTagRepository.CheckIfTagIsAttachedToMindmap(mindmapId, userId))
            {
                return BadRequest(new string[] { "Tag is already attached to mindmap!" });
            }

            await _mindmapTagRepository.DetachTagFromMindmap( mindmapId,tagId);

            return NoContent();
        }
    }
}
