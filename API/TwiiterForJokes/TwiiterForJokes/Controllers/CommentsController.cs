using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
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
    }
}
