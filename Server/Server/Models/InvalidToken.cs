using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class InvalidToken
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ValueOfInvalidToken { get; set; }
    }
}
