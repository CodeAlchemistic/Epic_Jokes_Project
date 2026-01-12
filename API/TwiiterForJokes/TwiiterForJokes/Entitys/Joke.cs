using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwiiterForJokes.Entitys
{
    [Table("Jokes")]
    public class Joke
    {
        [Key]
        [Column("joke_id")]
        public int JokeId { get; set; }

        [Column("usr_id")]
        public int UsrId { get; set; }
        [ForeignKey(nameof(UsrId))]
        //public Usr? Usr { get; set; }

        [Column("joke_content")]
        public string JokeContent { get; set; }
        [Column("rating")]
        public int Rating { get; set; }

        public Joke(int jokeId, int usrId, string jokeContent)
        {
            JokeId = jokeId;
            UsrId = usrId;
            JokeContent = jokeContent;
            
        }
    }
}
