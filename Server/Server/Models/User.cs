﻿using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class User
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public ICollection<Deck> OwnedDecks { get; set; } = new List<Deck>();

        public ICollection<Note> OwnedNotes { get; set; } = new List<Note>();

        public ICollection<NoteUser> LikedNotesUsers { get; set; } = new List<NoteUser>();

        public ICollection<FlashcardUser> OwnedFlashcards { get; set; } = new List<FlashcardUser>();
    }
}