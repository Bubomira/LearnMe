using Server.DTOs.TagDtos.ExportDtos;
using Server.Models;

namespace Server.DTOs.NoteDtos.ExportDtos
{
    public class NoteDetailsDto
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Content { get; set; }
        public int OwnerId { get; set; }
        public TagDetailsDto[] Tags { get; set; }

        public bool isOwnedByUser { get; set; }

        public bool isLikedByUser { get; set; }

    }
}
