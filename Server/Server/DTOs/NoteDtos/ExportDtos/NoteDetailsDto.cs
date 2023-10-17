using Server.Models;

namespace Server.DTOs.NoteDtos.ExportDtos
{
    public class NoteDetailsDto
    {
        public int Id { get; set; }

        public int Title { get; set; }
        public string Content { get; set; }
        public int OwnerId { get; set; }
        public string[] Tags { get; set; }

    }
}
