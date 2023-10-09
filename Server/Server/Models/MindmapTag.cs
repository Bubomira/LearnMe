namespace Server.Models
{
    public class MindmapTag
    {
        public int MindmapId { get; set; }

        public Mindmap Mindmap { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
