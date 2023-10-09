using Server.Enums;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Flashcard
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public FlashcardType Type { get; set; }

        //either picture or text, depending on the type
        public string Definition { get; set; }

        [Required]
        [MinLength(5)]
        public string Explanation { get; set; }

        public ICollection<DeckFlashcard> DecksFlashcards { get; set; } = new List<DeckFlashcard>();

        //todo: OwnerId



    }
}
