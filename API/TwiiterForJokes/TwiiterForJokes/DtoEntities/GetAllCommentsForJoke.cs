namespace TwiiterForJokes.DtoEntities;

public class GetAllCommentsForJoke
{
    public int CommentId { get; set; }
    public string AuthorName { get; set; }
    public string CommentContent { get; set; }
}