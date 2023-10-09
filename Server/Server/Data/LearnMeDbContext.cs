using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class LearnMeDbContext : DbContext
    {

        public LearnMeDbContext(DbContextOptions<LearnMeDbContext> options) : base(options)
        {

        }

        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<DeckFlashcard> DecksFlashcards { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public DbSet<DeckTag> DecksTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //many-to-many deck -> flashcard
            modelBuilder.Entity<DeckFlashcard>()
                .HasOne(df => df.Flashcard)
                .WithMany(df => df.DecksFlashcards)
                .HasForeignKey(df => df.FlashcardId);

            modelBuilder.Entity<DeckFlashcard>()
                .HasOne(df => df.Deck)
                .WithMany(df => df.DecksFlashcards)
                .HasForeignKey(df => df.DeckId);

            modelBuilder.Entity<DeckFlashcard>()
                .HasKey(df => new { df.DeckId, df.FlashcardId });

            //many-to-many deck -> tag

            modelBuilder.Entity<DeckTag>()
                .HasOne(dt => dt.Deck)
                .WithMany(dt => dt.DecksTags)
                .HasForeignKey(dt => dt.DeckId);

            modelBuilder.Entity<DeckTag>()
                .HasOne(dt => dt.Tag)
                .WithMany(dt => dt.DecksTags)
                .HasForeignKey(dt => dt.TagId);

            modelBuilder.Entity<DeckTag>()
                .HasKey(dt => new { dt.DeckId, dt.TagId });


        }
    }
}
