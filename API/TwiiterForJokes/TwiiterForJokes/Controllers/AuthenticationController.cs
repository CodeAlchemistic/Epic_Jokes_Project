using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.JwtSranda;
using TwiiterForJokes.DtoEntities;
using TwiiterForJokes.Entitys;
using Microsoft.AspNetCore.Mvc.Routing;
using System.Security.Claims;

namespace TwiiterForJokes.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {

        private readonly TokenProvider _configuration;
        private readonly AppDbContext _context;

        public AuthenticationController(AppDbContext context, TokenProvider configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(AuthorizationUserDto dto)
        {
            var usr = _context.Users.FirstOrDefault(u => u.UserName == dto.UserName && u.Password == dto.Password);
            if (usr == null) return Unauthorized("Špatné jméno nebo heslo.");

            string token = _configuration.Create(usr);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true, 
                Secure = true, 
                SameSite = SameSiteMode.Strict, 
                Expires = DateTime.UtcNow.AddHours(24) 
            };

            Response.Cookies.Append("secureToken", token, cookieOptions);
            
            return Ok(new { message = "Login Sicsesfull", token });

        }



        [HttpGet("this")]
        [Authorize]
        public IActionResult Ask()
        {
            var usrId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue("sub");  //sub claim 


            var userName = User.Identity?.Name
                    ?? User.FindFirstValue(ClaimTypes.Name)
                    ?? User.FindFirstValue("unique_name"); //unique_name claim

            return Ok(new { isAuthenticated = true, usrId, userName });

        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            var cookieOption = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(24)
            };

            Response.Cookies.Delete("secureToken", cookieOption);


            return Ok(new { message = "Logout was successful" });
        }


        [HttpGet("Profile")]
        [Authorize]
        public async Task<ActionResult> Profile()
        {
            var usrIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? User.FindFirstValue("sub");

            if (usrIdStr == null) return Unauthorized("Špatné jméno nebo heslo.");

            int usrId = int.Parse(usrIdStr);


            List<Joke> usrJokes = _context.Jokes.Where(u => u.UsrId == usrId).ToList();

            var dto = await _context.Users.Where(u => u.UsrId == usrId).Select(u => new
            {
                userId = u.UsrId,
                userName = u.UserName,
                jokeCount = u.Jokes.Count(),
                jokes = u.Jokes.Select(u => new GetJokeDto
                {
                    JokeId = u.JokeId,
                    JokeContent = u.JokeContent,
                })
            }).FirstOrDefaultAsync();

            await _context.SaveChangesAsync();
            if (dto == null) return NotFound();

            return Ok(dto);
        }
    }
}