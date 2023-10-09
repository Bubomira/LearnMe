using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Note
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public ICollection<NoteUser> LikedNotesUsers { get; set; } = new List<NoteUser>();

        public ICollection<NoteTag> NotesTags { get; set; } = new List<NoteTag>();
    }
}
