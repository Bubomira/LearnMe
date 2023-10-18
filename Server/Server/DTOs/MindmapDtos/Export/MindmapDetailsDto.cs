namespace Server.DTOs.MindmapDtos.Export
{
    public class MindmapDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string[] Tags { get; set; }
        public int OwnerId { get; set; }
    }
}
