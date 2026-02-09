using System.Diagnostics.Eventing.Reader;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1;
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

            var allJokes = await _context.Jokes.Select(j => new GetJokeDto
            {
                JokeId = j.JokeId,
                JokeContent = j.JokeContent,
                Rating = j.Rating,
                AuthorName = j.Usr!.UserName
            })
            .ToListAsync();

            return Ok(allJokes);
        }



        [HttpPost]
        public async Task<ActionResult<Joke>> CreateJoke(CreateJokeDto dto)
        {

            var usrIdclaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                             ?? User.FindFirstValue("sub");


            int usrId = int.Parse(usrIdclaim);


            //dto data assignment into DB 
            var joke = new Joke
            {
                UsrId = usrId,
                JokeContent = dto.JokeContent,
                Rating = dto.Rating
            };

            //usrId validation if the user really exists in the Db
            var realUser = await _context.Users.AnyAsync(u => u.UsrId == joke.UsrId);
            if (!realUser)
            {
                return BadRequest("User probably does not exist LOL. In other words: you're too stupid to proccess it correctlly :-D");
            }

            //return of the final object to the Db with JokeId autoincrement
            _context.Jokes.Add(joke);
            await _context.SaveChangesAsync();
            return Ok(joke);

        }

        [HttpPut("{id}/rating")]
        public async Task<ActionResult> EditJokeRating(int id, EditJokeRatingDto dto)
        {
            var joke = await _context.Jokes.FindAsync(id);

            if (joke == null)
            {
                return NotFound("This joke does not exist bro.");
            }

            if (dto.Rating < 0 || dto.Rating > 10)
            {
                return BadRequest("Rating must be in required format.");
            }

            joke.Rating = dto.Rating;

            await _context.SaveChangesAsync();
            return Ok(joke);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJoke(int id)
        {
            var joke = await _context.Jokes.FindAsync(id);

            //Joke deleteJoke = new Joke();

            if (joke == null)
            {
                return NotFound("This joke does not exist bro.");
            }
            else
            {
                var comments = _context.Comments.Where(c => c.JokeId == id);
                _context.Comments.RemoveRange(comments);

                _context.Jokes.Remove(joke);
                await _context.SaveChangesAsync();
            }
            

            return NoContent();    
           
        }
        
    }
}
