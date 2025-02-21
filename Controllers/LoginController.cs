using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using System;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

[Route("auth/user")]
[ApiController]
public class LoginController : ControllerBase
{
  private readonly IConfiguration _config;
  private readonly IUserService _userService; // Assuming you have a service to fetch user details

  public LoginController(IConfiguration config, IUserService userService)
  {
    _config = config;
    _userService = userService;
  }

  [HttpPost("login")]
  public IActionResult Login([FromBody] LoginRequest model)
  {
    if (model == null || string.IsNullOrEmpty(model.EmailPhone) || string.IsNullOrEmpty(model.Password))
    {
      return BadRequest(new { message = "Invalid login request" });
    }

    var user = _userService.GetUserByEmailOrPhone(model.EmailPhone);

    if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
    {
      return Unauthorized(new { message = "Invalid email or password" });
    }

    var tokenString = GenerateJwtToken(user);

    return Ok(new
    {
      token = tokenString,
      role = user.Role
    });
  }

  private string GenerateJwtToken(User user)
  {
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

    var token = new JwtSecurityToken(
        _config["Jwt:Issuer"],
        _config["Jwt:Audience"],
        claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  private bool VerifyPassword(string password, string storedHash)
  {
    // Replace with actual password verification logic
    return password == storedHash; // Example (use BCrypt or other hashing method in production)
  }
}

// Model for login request
public class LoginRequest
{
  public string? EmailPhone { get; set; }
  public string? Password { get; set; }
}

// Dummy User Service for example
public interface IUserService
{
  User GetUserByEmailOrPhone(string emailPhone);
}

public class User
{
  public int? Id { get; set; }
  public string? Email { get; set; }
  public string? PasswordHash { get; set; }
  public string? Role { get; set; }
}
