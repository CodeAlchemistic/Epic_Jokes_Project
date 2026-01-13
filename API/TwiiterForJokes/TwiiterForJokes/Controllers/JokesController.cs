using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using TwiiterForJokes.DtoEntities;
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



        [HttpPost]
        public async Task<ActionResult<Joke>> CreateJoke (CreateJokeDto dto)
        {
            

            //dto data assignment into DB 
            var joke = new Joke
            {
                    UsrId = dto.UsrId,
                    JokeContent = dto.JokeContent,
                    Rating = dto.Rating
            };

            //usrId validation if the user really exists in the Db
            var realUser = await _context.Users.AnyAsync(u => u.UsrId == dto.UsrId);
            if (!realUser)
            {
                return BadRequest("User probably does not exist LOL. In other words: you're too stupid to proccess it correctlly :-D");
            }

            //return of the final object to the Db with JokeId autoincrement
            _context.Jokes.Add(joke);
                await _context.SaveChangesAsync();
                return Ok(joke);

        }
        
    }
}
