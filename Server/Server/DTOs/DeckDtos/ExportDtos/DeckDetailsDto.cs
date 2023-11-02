
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.TagDtos.ExportDtos;

namespace Server.DTOs.DeckDtos.ExportDtos
{
    public class DeckDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public bool isOwnedByUser { get; set; }
        public bool isLikedByUser { get; set; }

        public ICollection<TagDetailsDto> Tags { get; set; }
        public ICollection<FlashcardDetailsDto> Flashcards { get; set; }

    }
}
