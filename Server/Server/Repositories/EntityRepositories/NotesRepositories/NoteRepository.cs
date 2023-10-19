using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.DTOs.NoteDtos.ImportDtos;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.NotesRepositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly LearnMeDbContext _learnMeDbContext;

        public NoteRepository(LearnMeDbContext learnMeDbContext)
        {
            _learnMeDbContext = learnMeDbContext;
        }
        public Task<bool> CheckIfNoteExists(int noteId) =>
            _learnMeDbContext.Notes.AnyAsync(n => n.Id == noteId);

        public Task<bool> CheckIfNoteIsOwnedByUser(int noteId, int userId) =>
            _learnMeDbContext.Notes.AnyAsync(n => n.Id == noteId && n.OwnerId == userId);


        public async Task<Note> CreateNote(NoteInfoDto noteInfoDto, int userId)
        {
            Note note = new Note()
            {
                Content = noteInfoDto.Content,
                OwnerId = userId,
                Title = noteInfoDto.Title
            };

            await _learnMeDbContext.Notes.AddAsync(note);

            await _learnMeDbContext.SaveChangesAsync();

            return note;
        }

        public async Task DeleteNote(int noteId)
        {
            Note note = await _learnMeDbContext.Notes.FirstOrDefaultAsync(n => n.Id == noteId);

            _learnMeDbContext.Notes.Remove(note);

            await _learnMeDbContext.SaveChangesAsync();
        }

        public Task<Note> GetNotesDetails(int noteId) =>
            _learnMeDbContext.Notes.Where(n => n.Id == noteId)
            .Include(n => n.NotesTags)
            .ThenInclude(nt => nt.Tag)
            .FirstOrDefaultAsync();

        public Task<List<Note>> SearchNotesByTitle(string noteName)=>
             _learnMeDbContext.Notes
            .Where(n => n.Title.ToLower().StartsWith(noteName.ToLower()) ||
            n.Title.ToLower().EndsWith(noteName.ToLower()) ||
           n.Title.ToLower().Contains(noteName.ToLower()))
            .Include(n=>n.NotesTags)
            .ThenInclude(nt=>nt.Tag)
            .ToListAsync();



        public async Task UpdateNote(NoteUpdateDto noteUpdateDto, int noteId)
        {
            Note note = await _learnMeDbContext.Notes.FirstOrDefaultAsync(n => n.Id == noteId);

            note.Content = noteUpdateDto.Content;
            note.Title = noteUpdateDto.Title;
            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
