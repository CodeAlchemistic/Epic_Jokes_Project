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

        
        [Column("usr_id")]
        public int UsrId { get; set; }
        [ForeignKey(nameof(UsrId))]

        [Column("joke_id")]
        public int JokeId { get; set; }
        [ForeignKey(nameof(JokeId))]


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
