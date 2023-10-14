namespace Server.Interfaces.EntityInterface.IDeckRepositories
{
    public interface IDeckUserRepository
    {
        public Task<bool> CheckIfDeckIsLikedByUser(int deckId,int userId);

        public Task LikeDeck(int deckId,int userId);

        public Task DislikeDeck(int deckId,int userId);
    }
}
