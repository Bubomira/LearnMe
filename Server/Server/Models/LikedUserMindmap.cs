namespace Server.Models
{
    public class LikedUserMindmap
    {
        public int MindmapId { get; set; }

        public Mindmap Mindmap { get; set; }

        public User LikerUser { get; set; }

        public int LikerUserId { get; set; }
    }
}
