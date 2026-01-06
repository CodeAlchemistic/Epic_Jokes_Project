using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using TwiiterForJokes.Context;

namespace TwiiterForJokes.Controllers
{
    public class UserController : Controller
    {
        private readonly AppDbContext AppDbContext;

        public UserController(AppDbContext appDbContext)
        {
            AppDbContext = appDbContext;
        }
    }
}
