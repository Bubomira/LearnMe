using Server.Enums;

namespace Server.DTOs.FlashcardDtos.ExportDtos
{
    public class FlashcardDetailsDto
    {
        public int Id { get; set; }
        public FlashcardType Type { get; set; }

        public string Definition { get; set; }

        public string Explanation { get; set; }
        public int OwnerId { get; set; }
    }
}
