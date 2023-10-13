using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Authentication;
using Server.Data;
using Server.Interfaces.AuthInterface;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.ServiceInterfaces;
using Server.Repositories;
using Server.Repositories.EntityRepositories;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//authentication
builder.Services.AddScoped<AuthFilter>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddScoped<IPasswordHasher, PasswordHasher>();


builder.Services.AddScoped<IFlashcardRepository,FlashcardRepository>();
builder.Services.AddScoped<IDeckRepository, DeckRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IDeckTagRepository, DeckTagRepository>();
builder.Services.AddScoped<IDeckFlashcardRepository, DeckFlashcardRepository>();


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

app.UseCors(builder => builder.WithOrigins("https://localhost:3000")
.AllowAnyMethod()
.WithHeaders("accept", "content-type", "origin"));

app.UseHttpsRedirection();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
