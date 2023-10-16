﻿using Microsoft.EntityFrameworkCore;
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
            .ThenInclude(nt => nt.Note)
            .FirstOrDefaultAsync();

        public async Task UpdateNote(string content, int noteId)
        {
            Note note = await _learnMeDbContext.Notes.FirstOrDefaultAsync(n => n.Id == noteId);

            note.Content = content;
            await _learnMeDbContext.SaveChangesAsync();
        }
    }
}
