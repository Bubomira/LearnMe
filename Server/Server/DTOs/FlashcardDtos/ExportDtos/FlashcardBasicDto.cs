using Server.Enums;

namespace Server.DTOs.FlashcardDtos.ExportDtos
{
    public class FlashcardBasicDto
    {
        public int Id { get; set; }
        public FlashcardType Type { get; set; }
        public string Definition { get; set; }
    }
}
