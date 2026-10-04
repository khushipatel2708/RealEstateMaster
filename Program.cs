using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RealEstate.Entity;
using RealEstate.Hubs;
using RealEstate.Services;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();

var connectionString = builder.Configuration.GetConnectionString("Server=LAPTOP-NTSLOF18;Database=RealEstate;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True;Connect Timeout=30");

builder.Services.AddDbContext<RealEstateContext>(options =>{
options.UseSqlServer(builder.Configuration.GetConnectionString("RealEstate"));
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularApp",
       builder => builder.WithOrigins("http://localhost:4200", "http://localhost:57380")
                         .AllowAnyMethod()
                         .AllowAnyHeader()
                         .AllowCredentials());

});
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      options.RequireHttpsMetadata = false;
      options.SaveToken = true;
      options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        NameClaimType = ClaimTypes.NameIdentifier
      };
    });
builder.Services.AddHttpClient("PayUClient", client =>
{
  client.Timeout = TimeSpan.FromSeconds(100); // Set timeout
  client.BaseAddress = new Uri("https://sandboxsecure.payu.in/"); // Base URL
});
builder.Services.Configure<RealEstate.Models.Email>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<PayUService>();
builder.Services.AddScoped<SmsService>();
builder.Services.AddSignalR();
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();
//app.MapStaticAssets();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}")
//    .WithStaticAssets();
app.UseRouting();
app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles();
app.MapHub<NotificationHub>("/notificationHub");
app.Run();
