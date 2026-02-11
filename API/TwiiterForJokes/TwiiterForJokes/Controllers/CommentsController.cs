using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{jokeId}")]
        public async Task<ActionResult<List<Comment>>> GetAllCommentsForJoke(int jokeId)
        {
            var commentsForJoke = await _context.Comments.Where(comment => comment.JokeId == jokeId).Select(comment => new GetAllCommentsForJoke()
            {
                CommentId = comment.CommentId,
                AuthorName = comment.Usr!.UserName,
                CommentContent = comment.CommentContent
            }).ToListAsync();

            return Ok(commentsForJoke);
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Comment>> CommentJoke(CreateCommentDto dto)
        {
            var usrIdclaim = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");


            int usrId = int.Parse(usrIdclaim);

            var comment = new Comment
            {
                UsrId =  usrId,
                JokeId = dto.JokeId,
                CommentContent = dto.CommentContent
            };

            var realJoke = await _context.Jokes.AnyAsync(c => c.JokeId == dto.JokeId);
            /*
            var realUser = await _context.Users.AnyAsync(u => u.UsrId == );

            if (!realJoke && !realUser)
            {
                return BadRequest("user neither joke does not exist.");
            }
            */

            if (!realJoke)
            {
                return BadRequest("This joke does not exist bro.");
            }

            /*
            if (!realUser)
            {
                return BadRequest("This user does not exist bro.");
            }
            */
            


            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return Ok(comment);
        }
    }
}
