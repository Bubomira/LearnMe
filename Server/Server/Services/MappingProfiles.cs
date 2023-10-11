using AutoMapper;
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
                src.OwnedFlashcards.Select(x => x.OwnerId)))
                 .ForMember(f => f.Tags,
                opt => opt.MapFrom(src =>
                src.DecksFlashcards.FirstOrDefault().Deck.Tags));

        }
    }
}
