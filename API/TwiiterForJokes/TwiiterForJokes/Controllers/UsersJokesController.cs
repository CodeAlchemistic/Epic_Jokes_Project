using Microsoft.AspNetCore.Mvc;
using TwiiterForJokes.Context;
using TwiiterForJokes.Entitys;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using TwiiterForJokes.DtoEntities;
using Microsoft.EntityFrameworkCore;

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
    public async Task<ActionResult<UsersJokesRating>> RateJokePersonally(CreatePersonalUserRating createPersonalUserRating)
    {

        var usrId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue("sub");

        UsersJokesRating personalRating = new UsersJokesRating();

        personalRating.UsrId =  Convert.ToInt32(usrId);
        personalRating.JokeId = createPersonalUserRating.JokeId;
        personalRating.Rating = createPersonalUserRating.Rating;

        if (createPersonalUserRating.JokeId == null)
        {
            return NotFound("This joke does not exist.");
        }
        if (usrId == null)
        {
            return NotFound("This user does not exist - you must be logged in.");
        }
        
        UsersJokesRating? existingRating = _context.UsersJokesRatings.FirstOrDefault(u => u.JokeId == createPersonalUserRating.JokeId && u.UsrId == Convert.ToInt32(usrId));

        if (existingRating != null)
        {
            return BadRequest("Už mě to nebavý");
        }

        decimal sumRating = _context.UsersJokesRatings.Where(us => us.JokeId == createPersonalUserRating.JokeId).Sum(us => us.Rating);
        decimal countRating = _context.UsersJokesRatings.Count(us => createPersonalUserRating.JokeId == us.JokeId );

        decimal avgRatting = Math.Round((sumRating + createPersonalUserRating.Rating) / (countRating + 1), 1);
        
        await _context.Jokes.Where(j => j.JokeId == createPersonalUserRating.JokeId).ExecuteUpdateAsync(set => set.SetProperty(j => j.Rating, avgRatting));
        
        await _context.UsersJokesRatings.AddAsync(personalRating);
        await _context.SaveChangesAsync();

        return Ok(personalRating);
    }


    [HttpGet]
    public async Task<ActionResult<List<UsersJokesRating>>> GetAllPersonalRatings()
    {
        var usrId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue("sub");

        List<UsersJokesRating> ratings = await _context.UsersJokesRatings.AsNoTracking().Where(u => u.UsrId == Convert.ToInt32(usrId)).ToListAsync();

        return Ok(ratings);
    }
    
}