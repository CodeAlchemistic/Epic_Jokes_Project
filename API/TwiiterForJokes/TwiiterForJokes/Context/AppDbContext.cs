using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Usr> Users { get; set; }
        public DbSet<Joke> Jokes { get; set; }
        public DbSet<Comment> Comments { get; set; }


        override protected void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            object value = optionsBuilder.UseMySQL("TBD");
;
        }
    }
}
