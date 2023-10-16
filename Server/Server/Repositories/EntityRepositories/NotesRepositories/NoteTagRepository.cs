using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.NotesRepositories
{
    public class NoteTagRepository : INoteTagRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public NoteTagRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }

        public async Task AttachTagToNote(List<int> tagIds, int noteId)
        {
            for (int i = 0; i < tagIds.Count; i++)
            {
                await _learnMeDbContext.NotesTags.AddAsync(new NoteTag()
                {
                    NoteId = noteId,
                    TagId = tagIds[i]
                });
            }

            await _learnMeDbContext.SaveChangesAsync();

        }

        public Task<bool> CheckIfTagIsAttachedToNote(int tagId, int noteId) =>
            _learnMeDbContext.NotesTags.AnyAsync(nt => nt.TagId == tagId && nt.NoteId == noteId);


        public async Task DetachTagFromNote(int tagId, int noteId)
        {
            var noteTag = await _learnMeDbContext.NotesTags
                .FirstOrDefaultAsync(nt => nt.TagId == tagId && nt.NoteId == noteId);

            _learnMeDbContext.NotesTags.Remove(noteTag);

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
