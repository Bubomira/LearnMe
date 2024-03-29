﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Server.Data;

#nullable disable

namespace Server.Migrations
{
    [DbContext(typeof(LearnMeDbContext))]
    partial class LearnMeDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Server.Models.Deck", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Decks", (string)null);
                });

            modelBuilder.Entity("Server.Models.DeckFlashcard", b =>
                {
                    b.Property<int>("DeckId")
                        .HasColumnType("int");

                    b.Property<int>("FlashcardId")
                        .HasColumnType("int");

                    b.HasKey("DeckId", "FlashcardId");

                    b.HasIndex("FlashcardId");

                    b.ToTable("DecksFlashcards", (string)null);
                });

            modelBuilder.Entity("Server.Models.DeckTag", b =>
                {
                    b.Property<int>("DeckId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("DeckId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("DecksTags", (string)null);
                });

            modelBuilder.Entity("Server.Models.Flashcard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Definition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Explanation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Flashcards", (string)null);
                });

            modelBuilder.Entity("Server.Models.FlashcardUser", b =>
                {
                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.Property<int>("FlashcardId")
                        .HasColumnType("int");

                    b.HasKey("OwnerId", "FlashcardId");

                    b.HasIndex("FlashcardId");

                    b.ToTable("OwnedUserFlashcards", (string)null);
                });

            modelBuilder.Entity("Server.Models.InvalidToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ValueOfInvalidToken")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("InvalidTokens", (string)null);
                });

            modelBuilder.Entity("Server.Models.LikedUserDeck", b =>
                {
                    b.Property<int>("DeckId")
                        .HasColumnType("int");

                    b.Property<int>("LikerUserId")
                        .HasColumnType("int");

                    b.HasKey("DeckId", "LikerUserId");

                    b.HasIndex("LikerUserId");

                    b.ToTable("LikedUserDecks", (string)null);
                });

            modelBuilder.Entity("Server.Models.LikedUserMindmap", b =>
                {
                    b.Property<int>("MindmapId")
                        .HasColumnType("int");

                    b.Property<int>("LikerUserId")
                        .HasColumnType("int");

                    b.HasKey("MindmapId", "LikerUserId");

                    b.HasIndex("LikerUserId");

                    b.ToTable("LikedUsersMindmaps", (string)null);
                });

            modelBuilder.Entity("Server.Models.Mindmap", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("JSONDiagram")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Mindmaps", (string)null);
                });

            modelBuilder.Entity("Server.Models.MindmapTag", b =>
                {
                    b.Property<int>("MindmapId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("MindmapId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("MindmapsTags", (string)null);
                });

            modelBuilder.Entity("Server.Models.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OwnerId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Notes", (string)null);
                });

            modelBuilder.Entity("Server.Models.NoteTag", b =>
                {
                    b.Property<int>("NoteId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("NoteId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("NotesTags", (string)null);
                });

            modelBuilder.Entity("Server.Models.NoteUser", b =>
                {
                    b.Property<int>("LikerUserId")
                        .HasColumnType("int");

                    b.Property<int>("NoteId")
                        .HasColumnType("int");

                    b.HasKey("LikerUserId", "NoteId");

                    b.HasIndex("NoteId");

                    b.ToTable("LikedNotesUsers", (string)null);
                });

            modelBuilder.Entity("Server.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Tags", (string)null);
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EventsJSON")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Server.Models.Deck", b =>
                {
                    b.HasOne("Server.Models.User", "Owner")
                        .WithMany("OwnedDecks")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Server.Models.DeckFlashcard", b =>
                {
                    b.HasOne("Server.Models.Deck", "Deck")
                        .WithMany("DecksFlashcards")
                        .HasForeignKey("DeckId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Flashcard", "Flashcard")
                        .WithMany("DecksFlashcards")
                        .HasForeignKey("FlashcardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deck");

                    b.Navigation("Flashcard");
                });

            modelBuilder.Entity("Server.Models.DeckTag", b =>
                {
                    b.HasOne("Server.Models.Deck", "Deck")
                        .WithMany("DecksTags")
                        .HasForeignKey("DeckId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Tag", "Tag")
                        .WithMany("DecksTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deck");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Server.Models.FlashcardUser", b =>
                {
                    b.HasOne("Server.Models.Flashcard", "Flashcard")
                        .WithMany("OwnedFlashcards")
                        .HasForeignKey("FlashcardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.User", "Owner")
                        .WithMany("OwnedFlashcards")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Flashcard");

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Server.Models.LikedUserDeck", b =>
                {
                    b.HasOne("Server.Models.Deck", "Deck")
                        .WithMany("LikedDecks")
                        .HasForeignKey("DeckId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Server.Models.User", "LikerUser")
                        .WithMany("LikedDecks")
                        .HasForeignKey("LikerUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Deck");

                    b.Navigation("LikerUser");
                });

            modelBuilder.Entity("Server.Models.LikedUserMindmap", b =>
                {
                    b.HasOne("Server.Models.User", "LikerUser")
                        .WithMany("LikedMindmaps")
                        .HasForeignKey("LikerUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Server.Models.Mindmap", "Mindmap")
                        .WithMany("LikedMindmaps")
                        .HasForeignKey("MindmapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LikerUser");

                    b.Navigation("Mindmap");
                });

            modelBuilder.Entity("Server.Models.Mindmap", b =>
                {
                    b.HasOne("Server.Models.User", "Owner")
                        .WithMany("OwnedMindmaps")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Server.Models.MindmapTag", b =>
                {
                    b.HasOne("Server.Models.Mindmap", "Mindmap")
                        .WithMany("MindmapsTags")
                        .HasForeignKey("MindmapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Tag", "Tag")
                        .WithMany("MindmapsTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Mindmap");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Server.Models.Note", b =>
                {
                    b.HasOne("Server.Models.User", "Owner")
                        .WithMany("OwnedNotes")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");
                });

            modelBuilder.Entity("Server.Models.NoteTag", b =>
                {
                    b.HasOne("Server.Models.Note", "Note")
                        .WithMany("NotesTags")
                        .HasForeignKey("NoteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Tag", "Tag")
                        .WithMany("NotesTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Note");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("Server.Models.NoteUser", b =>
                {
                    b.HasOne("Server.Models.User", "LikerUser")
                        .WithMany("LikedNotesUsers")
                        .HasForeignKey("LikerUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Server.Models.Note", "Note")
                        .WithMany("LikedNotesUsers")
                        .HasForeignKey("NoteId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("LikerUser");

                    b.Navigation("Note");
                });

            modelBuilder.Entity("Server.Models.Deck", b =>
                {
                    b.Navigation("DecksFlashcards");

                    b.Navigation("DecksTags");

                    b.Navigation("LikedDecks");
                });

            modelBuilder.Entity("Server.Models.Flashcard", b =>
                {
                    b.Navigation("DecksFlashcards");

                    b.Navigation("OwnedFlashcards");
                });

            modelBuilder.Entity("Server.Models.Mindmap", b =>
                {
                    b.Navigation("LikedMindmaps");

                    b.Navigation("MindmapsTags");
                });

            modelBuilder.Entity("Server.Models.Note", b =>
                {
                    b.Navigation("LikedNotesUsers");

                    b.Navigation("NotesTags");
                });

            modelBuilder.Entity("Server.Models.Tag", b =>
                {
                    b.Navigation("DecksTags");

                    b.Navigation("MindmapsTags");

                    b.Navigation("NotesTags");
                });

            modelBuilder.Entity("Server.Models.User", b =>
                {
                    b.Navigation("LikedDecks");

                    b.Navigation("LikedMindmaps");

                    b.Navigation("LikedNotesUsers");

                    b.Navigation("OwnedDecks");

                    b.Navigation("OwnedFlashcards");

                    b.Navigation("OwnedMindmaps");

                    b.Navigation("OwnedNotes");
                });
#pragma warning restore 612, 618
        }
    }
}
