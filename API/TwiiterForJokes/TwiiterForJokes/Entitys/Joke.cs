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

        [ForeignKey("usr_id")]
        public int UsrId { get; set; }
        [Column("joke_content")]
        public string JokeContent { get; set; }
        [Column("rating")]
        public int Rating { get; set; }

        public Joke(int jokeId, int usrId, string jokeContent, int rating)
        {
            JokeId = jokeId;
            UsrId = usrId;
            JokeContent = jokeContent;
            Rating = rating;
        }
    }
}
