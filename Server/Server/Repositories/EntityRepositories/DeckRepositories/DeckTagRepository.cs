using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.DeckRepositories
{
    public class DeckTagRepository : IDeckTagRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public DeckTagRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }

        public async Task AttachTagToDeck(List<int> tagIds, int deckId)
        {
            for (int i = 0; i < tagIds.Count; i++)
            {
                DeckTag deckTag = new DeckTag()
                {
                    TagId = tagIds[i],
                    DeckId = deckId
                };
                await _learnMeDbContext.DecksTags.AddAsync(deckTag);
            }

            await _learnMeDbContext.SaveChangesAsync();

        }

        public async Task DetachTagFromDeck(int tagId, int deckId)
        {
            var deckTag = await _learnMeDbContext.DecksTags.FirstOrDefaultAsync(dt => dt.DeckId == deckId && dt.TagId == tagId);

            _learnMeDbContext.DecksTags.Remove(deckTag);

            await _learnMeDbContext.SaveChangesAsync();
        }
        public Task<bool> CheckIfTagIsAttachedToDeck(int tagId, int deckId) =>
            _learnMeDbContext.DecksTags.AnyAsync(dt => dt.DeckId == deckId && dt.TagId == tagId);


    }
}
