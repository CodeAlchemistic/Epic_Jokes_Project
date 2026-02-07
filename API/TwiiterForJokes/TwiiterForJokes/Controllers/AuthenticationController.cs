using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.JwtSranda;
using TwiiterForJokes.DtoEntities;

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
            
            return Ok(new { message = "Login Sicsesfull" });

        }


    }
}