using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Mindmap
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string JSONDiagram { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public ICollection<MindmapTag> MindmapsTags { get; set; } = new List<MindmapTag>();
        public ICollection<LikedUserMindmap> LikedMindmaps { get; set; } = new List<LikedUserMindmap>();
    }
}
