﻿using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Deck
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(5)]

        public string Name { get; set; }

        [Required]
        public string Tags { get; set; }

        public ICollection<DeckFlashcard> DecksFlashcards { get; set; } = new List<DeckFlashcard>();

        public ICollection<DeckTag> DecksTags { get; set; } = new List<DeckTag>();

        //todo: OwnerId

    }
}
