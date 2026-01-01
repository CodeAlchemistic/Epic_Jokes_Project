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
            object value = optionsBuilder.UseMySQL("server=178.213.152.7;port=3308;database=twitter-for-jokes;user=gest2356;password=withheld4dakota1tasteful.exciting");
;
        }
    }
}
