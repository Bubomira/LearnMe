namespace Server.DTOs.FlashcardDtos.ImportDtos
{
    public class FlashcardEditDto
    {
        public string Type { get; set; }

        //either picture or text, depending on the type
        public string Definition { get; set; }

        public string Explanation { get; set; }

    }
}
