using Server.Enums;

namespace Server.DTOs.FlashcardDtos.ImportDtos
{
    public class FlashcardInfoDto
    {
        public string Type { get; set; }

        //either picture or text, depending on the type
        public string Definition { get; set; }

        public string Explanation { get; set; }

        public int DeckId { get; set; }

    }
}
