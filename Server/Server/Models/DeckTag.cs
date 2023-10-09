namespace Server.Models
{
    public class DeckTag
    {
        public int DeckId { get; set; }

        public Deck Deck { get; set; }

        public int TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
