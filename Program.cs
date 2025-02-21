using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();

var connectionString = builder.Configuration.GetConnectionString("Server=LAPTOP-NTSLOF18;Database=RealEstate;Trusted_Connection=True;Integrated Security=True;TrustServerCertificate=True;Connect Timeout=30");

builder.Services.AddDbContext<RealEstateContext>(options =>
{
options.UseSqlServer(builder.Configuration.GetConnectionString("RealEstate"));
});

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll",
      builder =>
      {
        builder.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader();
      });
});

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

app.UseAuthorization();

//app.MapStaticAssets();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}")
//    .WithStaticAssets();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.UseRouting();
app.UseStaticFiles();

app.Run();
