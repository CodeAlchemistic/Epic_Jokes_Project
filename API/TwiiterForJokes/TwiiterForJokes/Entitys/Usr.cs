using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwiiterForJokes.Entitys
{
    [Table("Users")]
    public class Usr
    {
        [Key]
        [Column("usr_id")]
        public int UsrId { get; set; }
        [Column("username")]
        public string UserName  { get; set; }
        [Column("passwd")]
        public string Password { get; set; }

        public ICollection<Joke> Jokes { get; set; } = new List<Joke>();


        public Usr() { }

        public Usr(int usrId, string userName, string password)
        {
            UsrId = usrId;
            UserName = userName;
            Password = password;
        }
    }
}
