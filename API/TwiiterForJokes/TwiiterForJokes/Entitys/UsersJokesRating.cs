using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwiiterForJokes.Entitys;

[Table("UsersJokesRatings")]
public class UsersJokesRating
{
     [Column("user_id")]
     public int UsrId { get; set; }
     [ForeignKey(nameof(UsrId))]

     [Column("joke_id")]
     public int JokeId { get; set; }
     [ForeignKey(nameof(JokeId))]

     [Column("rating")]
     public int Rating { get; set; }
}