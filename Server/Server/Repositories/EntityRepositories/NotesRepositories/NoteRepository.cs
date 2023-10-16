using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Models;

namespace Server.Repositories.EntityRepositories.NotesRepositories
{
    public class NoteRepository : INoteRepository
    {
        public Task<bool> CheckIfNoteExists(int noteId)=>

       

        public Task<bool> CheckIfNoteIsOwnedByUser(int noteId, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Note> CreateNote()
        {
            throw new NotImplementedException();
        }

        public Task DeleteNote(int noteId)
        {
            throw new NotImplementedException();
        }

        public Task<Note> GetNotesDetails(int noteId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateNote(int noteId)
        {
            throw new NotImplementedException();
        }
    }
}
