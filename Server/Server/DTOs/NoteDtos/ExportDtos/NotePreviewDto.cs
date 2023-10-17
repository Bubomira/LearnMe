using Microsoft.AspNetCore.Mvc;

namespace Server.DTOs.NoteDtos.ExportDtos
{
    public class NotePreviewDto
    {
        public int Id { get; set; }

        public string[] Tags { get; set; }

        public string Title { get; set; }

        public int OwnerId { get; set; }
    }
}
