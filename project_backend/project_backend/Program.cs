using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project_backend.Data;
using project_backend.Models;
using project_backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITableService, TableService>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
        
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["access-token"];
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins("http://localhost:5173")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    // On first launch only
    if (!db.Users.Any())
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword("password");
        db.Users.AddRange(
            new User { Email = "testUser@test.com", PasswordHash = hashedPassword, Role = "User" },
            new User { Email = "testManager@test.com", PasswordHash = hashedPassword, Role = "Manager" },
            new User { Email = "testAdmin@test.com", PasswordHash = hashedPassword, Role = "Admin" }
        );
        
        db.CompanyData.AddRange(
            new CompanyData { Department = "HR", Revenue = 150000.00, Expenses = 50000.00 },
            new CompanyData { Department = "Engineering", Revenue = 750000.00, Expenses = 250000.00 },
            new CompanyData { Department = "Sales", Revenue = 1200000.00, Expenses = 400000.00 },
            new CompanyData { Department = "Marketing", Revenue = 450000.00, Expenses = 150000.00 }
        );

        db.Items.AddRange(
            new Item { Name = "Laptop", Quantity = 50, Price = 1200.00 },
            new Item { Name = "Mouse", Quantity = 200, Price = 25.00 },
            new Item { Name = "Keyboard", Quantity = 150, Price = 75.00 },
            new Item { Name = "Monitor", Quantity = 100, Price = 300.00 },
            new Item { Name = "Docking Station", Quantity = 75, Price = 150.00 }
        );
        
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();