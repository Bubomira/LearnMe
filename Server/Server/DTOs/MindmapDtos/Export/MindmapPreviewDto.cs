using Server.DTOs.TagDtos.ExportDtos;

namespace Server.DTOs.MindmapDtos.Export
{
    public class MindmapPreviewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public TagDetailsDto[] Tags { get; set; }
        public bool isOwnedByUser { get; set; }

        public bool isLikedByUser { get; set; }
    }
}
