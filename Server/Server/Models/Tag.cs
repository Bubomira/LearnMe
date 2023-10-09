using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Tag
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Name { get; set; }

        public ICollection<DeckTag> DecksTags { get; set; } = new List<DeckTag>();
    }
}
