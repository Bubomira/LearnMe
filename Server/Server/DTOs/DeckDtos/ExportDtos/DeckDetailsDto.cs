
namespace Server.DTOs.DeckDtos.ExportDtos
{
    public class DeckDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int OwnerId { get; set; }

        public ICollection<string> Tags { get; set; }
        public ICollection<string> Flashcards { get; set; }

    }
}
