using Server.DTOs.TagDtos.ExportDtos;

namespace Server.DTOs.MindmapDtos.Export
{
    public class MindmapDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TagDetailsDto[] Tags { get; set; }

        public string JSONDiagram { get; set; }
        public bool isOwnedByUser { get; set; }

        public bool isLikedByUser { get; set; }
    }
}
