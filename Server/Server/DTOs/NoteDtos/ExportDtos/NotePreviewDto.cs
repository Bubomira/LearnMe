using Microsoft.AspNetCore.Mvc;
using Server.DTOs.TagDtos.ExportDtos;

namespace Server.DTOs.NoteDtos.ExportDtos
{
    public class NotePreviewDto
    {
        public int Id { get; set; }

        public TagDetailsDto[] Tags { get; set; }

        public string Title { get; set; }

        public int OwnerId { get; set; }
    }
}
