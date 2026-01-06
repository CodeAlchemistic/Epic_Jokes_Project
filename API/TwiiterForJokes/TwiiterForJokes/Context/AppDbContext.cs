using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<Usr> Users { get; set; }
        public DbSet<Joke> Jokes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


    }
}
