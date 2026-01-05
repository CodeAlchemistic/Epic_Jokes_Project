using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwiiterForJokes.Entitys
{
    [Table("Comments")]
    public class Comment
    {
        [Key]
        [Column("comment_id")]
        public int CommentId { get; set; }
        [ForeignKey("user_id")]
        public int UsrId { get; set; }
        [ForeignKey("joke_id")]
        public int JokeId { get; set; }
        [Column("comment_content")]
        [Required]
        public string CommentContent { get; set; }

        public Comment(int commentId, int usrId, int jokeId, string commentContent)
        {
            CommentId = commentId;
            UsrId = usrId;
            JokeId = jokeId;
            CommentContent = commentContent;
        }
    }
}
