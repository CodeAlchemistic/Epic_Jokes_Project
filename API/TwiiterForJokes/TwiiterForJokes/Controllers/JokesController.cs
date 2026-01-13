using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JokesController : Controller
    {
        private readonly AppDbContext _context;

        public JokesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Joke>>> GetAllJokes()
        {

            var allJokes = await _context.Jokes.ToListAsync();
            
            // technically unreachable code
            if (allJokes.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok(allJokes);
            }
        }

        /*
         * continuing HttpPost actions
         * 
         */
        
    }
}
