using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class FlashcardUser
    {
        [Required]
        public int FlashcardId { get; set; }
        public Flashcard Flashcard { get; set; }

        [Required]
        public int OwnerId { get; set; }
        public User Owner { get; set; }
    }
}
