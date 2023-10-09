namespace Server.Models
{
    public class NoteUser
    {
        public int NoteId { get; set; }

        public Note Note { get; set; }

        public int LikerUserId { get; set; }

        public User LikerUser { get; set; }
    }
}
