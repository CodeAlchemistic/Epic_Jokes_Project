using Microsoft.AspNetCore.Mvc;
using TwiiterForJokes.Context;
using TwiiterForJokes.Entitys;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace TwiiterForJokes.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersJokesController : Controller
{

    private readonly AppDbContext _context;

    public UsersJokesController(AppDbContext context)
    {
        _context = context;
    }


    [HttpPost]
    public async Task<ActionResult<UsersJokesRating>> RateJokePersonally(int jokeId, int rating)
    {




        var usrId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue("sub");


        UsersJokesRating personalRating = new UsersJokesRating();

        personalRating.UsrId =  Convert.ToInt32(usrId);
        personalRating.JokeId = jokeId;
        personalRating.Rating = rating;

        if (jokeId == null)
        {
            return NotFound("This joke does not exist.");
        }
        if (usrId == null)
        {
            return NotFound("This user does not exist - you must be logged in.");
        }

        await _context.UsersJokesRatings.AddAsync(personalRating);
        await _context.SaveChangesAsync();

        return Ok(personalRating);
    }
}