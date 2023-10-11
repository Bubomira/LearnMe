using AutoMapper;
using Server.DTOs.DeckDtos.ExportDtos;
using Server.DTOs.FlashcardDtos.ExportDtos;
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
        }
    }
}
