using AutoMapper;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.Models;

namespace Server.Services
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Flashcard, FlashcardDetailsDto>()
                 .ForMember(f => f.OwnerId,
                opt => opt.MapFrom(src =>
                src.OwnedFlashcards.Select(x => x.OwnerId).FirstOrDefault()));

            CreateMap<Deck, DeckDetailsDto>()
                .ForMember(d => d.Flashcards,
                opt => opt.MapFrom(src =>
                src.DecksFlashcards.Select(df => new FlashcardBasicDto()
                {
                    Definition = df.Flashcard.Definition,
                    Id = df.Flashcard.Id,
                    Type = df.Flashcard.Type
                }).ToList()))
                .ForMember(d => d.Tags,
                opt => opt.MapFrom(src =>
                src.DecksTags.Select(dt =>
                    dt.Tag.Name).ToList()));

            CreateMap<Note, NoteDetailsDto>()
               .ForMember(n => n.Tags,
               opt => opt.MapFrom(src =>
               src.NotesTags.Select(dt =>
                   dt.Tag.Name).ToList()))
               .ForMember(n => n.Title,
               opt => opt.MapFrom(nt => nt.Title));

            CreateMap<LikedUserDeck, DeckPreviewDto>()
                .ForMember(lud => lud.Name,
                opt => opt.MapFrom(src => src.Deck.Name))
                .ForMember(lud => lud.OwnerId,
                opt => opt.MapFrom(src => src.Deck.OwnerId))
                .ForMember(lud => lud.Tags, opt => opt.MapFrom(src =>
               src.Deck.DecksTags.Select(dt =>
                   dt.Tag.Name).ToList()));

            CreateMap<Deck, DeckPreviewDto>()
               .ForMember(lud => lud.Tags, opt => opt.MapFrom(src =>
              src.DecksTags.Select(dt =>
                  dt.Tag.Name).ToList()));

            CreateMap<NoteUser, NotePreviewDto>()
                .ForMember(nu => nu.Title,
                opt => opt.MapFrom(src => src.Note.Title))
                  .ForMember(nu => nu.OwnerId,
                opt => opt.MapFrom(src => src.Note.OwnerId))
                   .ForMember(nu => nu.Tags, opt => opt.MapFrom(src =>
               src.Note.NotesTags.Select(dt =>
                   dt.Tag.Name).ToList()));

            CreateMap<Note, NotePreviewDto>()
                .ForMember(n => n.Tags,
                opt => opt.MapFrom(src =>
                src.NotesTags.Select(nt => nt.Tag.Name).ToList()));

        }
    }
}