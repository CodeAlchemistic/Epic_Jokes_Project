using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
using TwiiterForJokes.DtoEntities;
using TwiiterForJokes.Entitys;

namespace TwiiterForJokes.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<List<Usr>>> GetUsers()
    {
        var users = await _context.Users.Select(u => new GetUsrsDto
        {
            UserId = u.UsrId,
            UserName = u.UserName,
            JokesCount = u.Jokes.Count()
        }).ToListAsync();

        return Ok(users);
    }


    [HttpGet("{id}")]
    public async Task<Usr> GetUser(int id)
    {
        Usr usr = await _context.Users.FindAsync(id);

        return usr;
    }


    [HttpPost]
    public async Task<ActionResult<Usr>> CreateUser(CreateUserDto dto)
    {
        

        Usr? teoreticUser = _context.Users.FirstOrDefault(u => u.UserName == dto.UserName);

        if (teoreticUser != null)
        {
            return BadRequest("This user already exists.");
        }

        Usr usr = new Usr
        {
            UserName = dto.UserName,
            Password = dto.Password
        };



        _context.Users.Add(usr);
        await _context.SaveChangesAsync();

        return Ok(usr);
           
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        Usr? userToFind = _context.Users.FindAsync(id).Result;

        if (userToFind == null)
        {
            return BadRequest("User not found.");
        }

        _context.Users.Remove(userToFind);
        await _context.SaveChangesAsync();

        return Ok();

    }

}