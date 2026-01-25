namespace TwiiterForJokes.DtoEntities
{
    public class CreateCommentDto
    {
        public int UsrId { get; set; }
        public int JokeId { get; set; }
        public string CommentContent { get; set; }
    }
}
