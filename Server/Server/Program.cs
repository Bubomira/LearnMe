using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Server.Authentication;
using Server.Data;
using Server.Interfaces.AuthInterface;
using Server.Interfaces.EntityInterface;
using Server.Interfaces.EntityInterface.IDeckRepositories;
using Server.Interfaces.EntityInterface.IMindmapRepository;
using Server.Interfaces.EntityInterface.INotesRepositories;
using Server.Interfaces.ServiceInterfaces;
using Server.Middlewares;
using Server.Repositories;
using Server.Repositories.EntityRepositories;
using Server.Repositories.EntityRepositories.DeckRepositories;
using Server.Repositories.EntityRepositories.MindmapRepositories;
using Server.Repositories.EntityRepositories.NotesRepositories;
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


builder.Services.AddScoped<IFlashcardRepository, FlashcardRepository>();

builder.Services.AddScoped<IDeckRepository, DeckRepository>();
builder.Services.AddScoped<IDeckTagRepository, DeckTagRepository>();
builder.Services.AddScoped<IDeckFlashcardRepository, DeckFlashcardRepository>();
builder.Services.AddScoped<IDeckUserRepository,DeckUserRepository>();

builder.Services.AddScoped<ITagRepository, TagRepository>();

builder.Services.AddScoped<INoteUserRepository, NoteUserRepository>();
builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<INoteTagRepository, NoteTagRepository>();

builder.Services.AddScoped<IMindmapRepository, MindmapRepository>();
builder.Services.AddScoped<IMindmapTagRepository, MindmapTagRepository>();
builder.Services.AddScoped<IMindmapUserRepository, MindmapUserRepository>();

builder.Services.AddScoped<IEventRepository, EventRepository>();



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

app.UseCors(builder => builder.WithOrigins("*")
.AllowAnyMethod()
.WithHeaders("accept", "content-type", "origin", "authorization"));

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
