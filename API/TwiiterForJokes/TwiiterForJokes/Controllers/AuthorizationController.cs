using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TwiiterForJokes.Context;
using TwiiterForJokes.DtoEntities;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : Controller
    {
        private readonly AppDbContext _context;
        



        [HttpPost]
        public async Task<ActionResult<Usr>> Login(AuthorizationUserDto dto)
        {
            Usr? usr = _context.Users.FirstOrDefault(u => u.UserName == dto.UserName && u.Password == dto.Password);
            if (usr == null)
            {
                return NotFound("Wrong data.");
            }

            List<Claim> claims = new List<Claim>();


        }
        
    }
}
