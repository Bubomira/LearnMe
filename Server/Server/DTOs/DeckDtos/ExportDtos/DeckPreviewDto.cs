namespace Server.DTOs.DeckDtos.ExportDtos
{
    public class DeckPreviewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string[] Tags { get; set; }

        public int OwnerId { get; set; }
    }
}
