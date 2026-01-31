namespace TwiiterForJokes.DtoEntities
{
    /// <summary>
    /// DTO class to get all jokes on Jokes page
    /// returns: JokeId, JokeContent, Rating, AthorName (User who created the joke, FK from DB)
    /// </summary>
    public class GetJokeDto
    {
        public int JokeId { get; set; }
        public string JokeContent { get; set; }
        public int Rating { get; set; }
        public string AuthorName { get; set; } = null!;
    }
}
