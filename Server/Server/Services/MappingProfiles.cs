using AutoMapper;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ExportDtos;
using Server.DTOs.MindmapDtos.Export;
using Server.DTOs.NoteDtos.ExportDtos;
using Server.Models;

namespace Server.Services
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Flashcard, FlashcardDetailsDto>()
                 .ForMember(f => f.isOwnedByUser,
                 opt => opt.Ignore());

            CreateMap<Deck, DeckDetailsDto>()
                .ForMember(d=>d.isLikedByUser,
                opt=>opt.Ignore())
                .ForMember(d => d.isOwnedByUser,
                opt => opt.Ignore())
                .ForMember(d => d.Flashcards,
                opt => opt.MapFrom(src =>
                src.DecksFlashcards.Select(df => new FlashcardBasicDto
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
              .ForMember(n => n.isOwnedByUser,
                 opt => opt.Ignore())
                .ForMember(n => n.isLikedByUser,
                 opt => opt.Ignore())
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

            CreateMap<Mindmap, MindmapDetailsDto>()
                  .ForMember(m => m.isOwnedByUser,
                 opt => opt.Ignore())
                    .ForMember(m => m.isLikedByUser,
                 opt => opt.Ignore())
                .ForMember(mdd => mdd.Tags, opt =>
                opt.MapFrom(src =>
                src.MindmapsTags.Select(mt => mt.Tag.Name).ToList()));

            CreateMap<MindmapTag,MindmapDetailsDto>()
                .ForMember(mdd=>mdd.Id, opt=>
                opt.MapFrom(src=>
                src.Mindmap.Id))
                .ForMember(mdd => mdd.Name, opt =>
                opt.MapFrom(src =>
                src.Mindmap.Name))
                  .ForMember(m => m.isLikedByUser,
                 opt => opt.Ignore())
                .ForMember(mdd => mdd.Tags, opt =>
                opt.MapFrom(src =>
                src.Mindmap.MindmapsTags.Select(mt => mt.Tag.Name).ToList()));

            CreateMap<NoteTag, NotePreviewDto>()
               .ForMember(npd => npd.Id, opt =>
               opt.MapFrom(src =>
               src.Note.Id))
               .ForMember(npd => npd.Title, opt =>
               opt.MapFrom(src =>
               src.Note.Title))
               .ForMember(npd => npd.OwnerId, opt =>
               opt.MapFrom(src =>
               src.Note.OwnerId))
               .ForMember(npd => npd.Tags, opt =>
               opt.MapFrom(src =>
               src.Note.NotesTags.Select(mt => mt.Tag.Name).ToList()));


            CreateMap<DeckTag, DeckPreviewDto>()
              .ForMember(dpd => dpd.Id, opt =>
              opt.MapFrom(src =>
              src.Deck.Id))
              .ForMember(dpd => dpd.Name, opt =>
              opt.MapFrom(src =>
              src.Deck.Name))
              .ForMember(dpd => dpd.OwnerId, opt =>
              opt.MapFrom(src =>
              src.Deck.OwnerId))
              .ForMember(dpd => dpd.Tags, opt =>
              opt.MapFrom(src =>
              src.Deck.DecksTags.Select(mt => mt.Tag.Name).ToList()));


        }
    }
}