using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using TwiiterForJokes.DtoEntities;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAllComments()
        {
            var allComments = await _context.Comments.ToListAsync();
            return Ok(allComments);
        }



        [HttpPost]
        public async Task<ActionResult<Comment>> CommentJoke(CreateCommentDto dto)
        {
            var comment = new Comment
            {
                UsrId = dto.UsrId,
                JokeId = dto.JokeId,
                CommentContent = dto.CommentContent
            };

            var realJoke = await _context.Jokes.AnyAsync(c => c.JokeId == dto.JokeId);
            var realUser = await _context.Users.AnyAsync(u => u.UsrId == dto.UsrId);

            if (!realJoke && !realUser)
            {
                return BadRequest("user neither joke does not exist.");
            }

            if (!realJoke)
            {
                return BadRequest("This joke does not exist bro.");
            }

            
            if (!realUser)
            {
                return BadRequest("This user does not exist bro.");
            }

            


            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return Ok(comment);
        }
    }
}
