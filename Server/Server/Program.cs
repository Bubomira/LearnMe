using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Authentication;
using Server.Data;
using Server.Interfaces.ServiceInterfaces;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();

builder.Services.AddScoped<AuthFilter>();



builder.Services.AddDbContext<LearnMeDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultCoonection"));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
