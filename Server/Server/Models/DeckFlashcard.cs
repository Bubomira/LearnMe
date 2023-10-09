using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class DeckFlashcard
    {
        [Required]
        public int FlashcardId { get; set; }

        public Flashcard Flashcard { get; set; }

        [Required]
        public int DeckId { get; set; }

        public Deck Deck { get; set; }


    }
}
