namespace Server.DTOs.AuthDtos.ExportDtos
{
    public class LoggedInUserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Token { get; set; }
    }
}
