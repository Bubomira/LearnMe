using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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
        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<NoteUser> LikedNotesUsers { get; set; }
        public DbSet<NoteTag> NotesTags { get; set; }
        public DbSet<FlashcardUser> OwnedUserFlashcards { get; set; }
        public DbSet<LikedUserDeck> LikedUserDecks { get; set; }
        public DbSet<Mindmap> Mindmaps { get; set; }
        public DbSet<MindmapTag> MindmapsTags { get; set; }
        public DbSet<LikedUserMindmap> LikedUsersMindmaps { get; set; }


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


            //many-to-many user -> flashcard  (ownership) 

            modelBuilder.Entity<FlashcardUser>()
                .HasOne(fu => fu.Flashcard)
                .WithMany(fu => fu.OwnedFlashcards)
                .HasForeignKey(fu => fu.FlashcardId);


            modelBuilder.Entity<FlashcardUser>()
                .HasOne(fu => fu.Owner)
                .WithMany(fu => fu.OwnedFlashcards)
                .HasForeignKey(fu => fu.OwnerId);

            modelBuilder.Entity<FlashcardUser>()
                .HasKey(fu => new {fu.OwnerId, fu.FlashcardId });


            //many-to-many user -> note (liking)

            modelBuilder.Entity<NoteUser>()
                .HasOne(nu => nu.LikerUser)
                .WithMany(nu => nu.LikedNotesUsers)
                .HasForeignKey(nu => nu.LikerUserId);

            modelBuilder.Entity<NoteUser>()
               .HasOne(nu => nu.Note)
               .WithMany(nu => nu.LikedNotesUsers)
               .HasForeignKey(nu => nu.NoteId)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<NoteUser>()
                .HasKey(dt => new { dt.LikerUserId, dt.NoteId });

            //many-to-many note -> tag 

            modelBuilder.Entity<NoteTag>()
                .HasOne(nt => nt.Tag)
                .WithMany(nt => nt.NotesTags)
                .HasForeignKey(nt => nt.TagId);

            modelBuilder.Entity<NoteTag>()
                .HasOne(nt => nt.Note)
                .WithMany(nt => nt.NotesTags)
                .HasForeignKey(nt => nt.NoteId);

            modelBuilder.Entity<NoteTag>()
                .HasKey(nt => new { nt.NoteId, nt.TagId });


            //many-to-many user -> deck  (liking) 

            modelBuilder.Entity<LikedUserDeck>()
                .HasOne(lud => lud.Deck)
                .WithMany(lud => lud.LikedDecks)
                .HasForeignKey(lud => lud.DeckId)
                 .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LikedUserDeck>()
               .HasOne(lud => lud.LikerUser)
               .WithMany(lud => lud.LikedDecks)
               .HasForeignKey(lud => lud.LikerUserId);

            modelBuilder.Entity<LikedUserDeck>()
                .HasKey(lud => new {lud.DeckId,lud.LikerUserId});

            //many-to-many mindmap -> tag 

            modelBuilder.Entity<MindmapTag>()
                .HasOne(mt => mt.Tag)
                .WithMany(mt => mt.MindmapsTags)
                .HasForeignKey(mt => mt.TagId);

            modelBuilder.Entity<MindmapTag>()
                .HasOne(mt => mt.Mindmap)
                .WithMany(mt => mt.MindmapsTags)
                .HasForeignKey(mt => mt.MindmapId);

            modelBuilder.Entity<MindmapTag>()
                .HasKey(mt => new { mt.MindmapId, mt.TagId });


            //many-to-many user -> mindmap (liking) 

            modelBuilder.Entity<LikedUserMindmap>()
                .HasOne(lum => lum.Mindmap)
                .WithMany(lum => lum.LikedMindmaps)
                .HasForeignKey(lum => lum.MindmapId);

            modelBuilder.Entity<LikedUserMindmap>()
                .HasOne(lum => lum.LikerUser)
                .WithMany(lum => lum.LikedMindmaps)
                .HasForeignKey(lum => lum.LikerUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LikedUserMindmap>()
                .HasKey(lum => new { lum.MindmapId, lum.LikerUserId });


        }
    }
}
