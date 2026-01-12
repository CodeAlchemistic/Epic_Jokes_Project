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
        [Column("password")]
        public string Password { get; set; }

        public Usr(int usrId, string userName, string password)
        {
            UsrId = usrId;
            UserName = userName;
            Password = password;
        }
    }
}
