namespace Server.Models
{
    public class LikedUserDeck
    {
        public int DeckId { get; set; }

        public Deck Deck { get; set; }

        public int LikerUserId { get; set; }
        public User LikerUser { get; set; }
    }
}
