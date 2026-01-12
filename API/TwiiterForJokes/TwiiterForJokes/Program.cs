using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using TwiiterForJokes.Context;
using TwiiterForJokes.Entitys;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connString = builder.Configuration.GetConnectionString("uplne_nejvic_tajny_spojovaci_klic");

builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(connString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();



