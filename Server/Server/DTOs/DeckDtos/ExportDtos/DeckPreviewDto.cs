using Server.DTOs.TagDtos.ExportDtos;

namespace Server.DTOs.DeckDtos.ExportDtos
{
    public class DeckPreviewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public TagDetailsDto[] Tags { get; set; }

        public int OwnerId { get; set; }
    }
}
