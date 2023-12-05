using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.NotesRepositories
{
    public class NoteUserRepository : INoteUserRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public NoteUserRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfNoteIsLikedByUser(int noteId, int userId)
            => _learnMeDbContext.LikedNotesUsers.AnyAsync(lnu => lnu.NoteId == noteId && lnu.LikerUserId == userId);


        public async Task DislikeNote(int noteId, int userId)
        {
            var noteUser = await _learnMeDbContext.LikedNotesUsers
                  .FirstOrDefaultAsync(lnu => lnu.LikerUserId == userId && lnu.NoteId == noteId);

            _learnMeDbContext.LikedNotesUsers.Remove(noteUser);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<List<NoteUser>> GetLikedNotes(int userId) =>
            _learnMeDbContext.LikedNotesUsers.Where(lnu => lnu.LikerUserId == userId)
            .Include(lnu=>lnu.Note.NotesTags.Take(3))
            .ThenInclude(nt=>nt.Tag)
            .ToListAsync();


        public Task<List<Note>> GetOwnedNotes(int userId) =>
            _learnMeDbContext.Notes.Where(n => n.OwnerId == userId)
            .Include(n => n.NotesTags.Take(3))
            .ThenInclude(nt => nt.Tag)
            .ToListAsync();


        public async Task LikeNote(int noteId, int userId)
        {
            NoteUser noteUser = new NoteUser()
            {
                NoteId = noteId,
                LikerUserId = userId
            };

            await _learnMeDbContext.LikedNotesUsers.AddAsync(noteUser);

            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
