using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TwiiterForJokes.Context;
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
        return await _context.Users.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<Usr> GetUser(int id)
    {
        Usr usr = await _context.Users.FindAsync(id);
        
        return usr;
    }
}