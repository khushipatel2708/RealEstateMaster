using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using System;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using RealEstate.Models;
using RealEstate.Entity;
using Microsoft.AspNetCore.Authorization;

[Route("api/auth/user")]
[ApiController]
public class LoginController : ControllerBase
{
  private readonly IConfiguration _config;
  private readonly RealEstateContext _context;

  public LoginController(IConfiguration config, RealEstateContext context)
  {
    _config = config;
    _context = context;
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginRequest model)
  {
    if (model == null || string.IsNullOrEmpty(model.EmailPhone) || string.IsNullOrEmpty(model.Password))
    {
      return BadRequest(new { message = "Invalid login request" });
    }

    var user = await _context.Users
       .AsNoTracking()
        .FirstOrDefaultAsync(u => u.Email == model.EmailPhone || u.PhoneNo == model.EmailPhone);
    var role = user.Role;
    if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
    {
      return Unauthorized(new { message = "Invalid Credentials" });
    }

    var token = GenerateJwtToken(user);
    return Ok(new { message = "Login Successful", token,role });
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterRequest model)
  {
    var existingUser = await _context.Users
        .AnyAsync(u => u.Email == model.Email || u.PhoneNo == model.PhoneNo);

    if (existingUser)
    {
      return BadRequest(new { message = "User already exists" });
    }
    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);
    var newUser = new User
    {
      Fname = model.Fname,
      Lname = model.LName,
      UserName = model.UserName,
      Email = model.Email,
      PhoneNo = model.PhoneNo,
      StateId = model.StateId,
      CityId = model.CityId,
      Pincode = model.Pincode,
      Role = model.Role,
      Password = hashedPassword,
      CreatedOn = DateTime.UtcNow
    };

    _context.Users.Add(newUser);
    await _context.SaveChangesAsync();

    var token = GenerateJwtToken(newUser);
    return Ok(new { message = "User Added Successfully", id = newUser.Id, token });
  }

  [HttpGet("currentUser")]
  public async Task<IActionResult> GetCurrentUser()
  {
    try
    {
      // Log headers for debugging
      foreach (var header in Request.Headers)
      {
        Console.WriteLine($"Header: {header.Key} = {header.Value}");
      }
      foreach (var claim in User.Claims)
      {
        Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
      }

      // Extract User ID from token
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      Console.WriteLine($"Extracted User ID from token: {userIdClaim}");

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized(new { message = "User ID not found in token." });
      }

      if (!int.TryParse(userIdClaim, out int userId))
      {
        return BadRequest(new { message = "Invalid User ID format." });
      }

      // Fetch user from database
      var user = await _context.Users.FindAsync(userId);
      if (user == null)
      {
        return NotFound(new { message = "User not found." });
      }

      return Ok(new
      {
        user.Id,
        user.UserName,
        user.Email,
        user.Role,
        user.PhoneNo,
        user.StateId,
        user.CityId,
        user.Pincode,
        PhotoPath = !string.IsNullOrEmpty(user.PhotoPath) ? $"http://localhost:5026{user.PhotoPath}" : null
      });
    }
    catch (Exception ex)
    {
      Console.WriteLine($"Error in GetCurrentUser: {ex.Message}");
      return StatusCode(500, new { message = "Unexpected error", error = ex.Message });
    }
  }


  [HttpGet("{id}")]
  public async Task<IActionResult> GetCurrentUser(int id)
  {
    if (id <= 0)
    {
      return BadRequest(new { message = "Invalid user ID." });
    }

    // Retrieve user from the database by ID
    var user = await _context.Users.FindAsync(id);

    if (user == null)
    {
      return NotFound(new { message = "User not found." });
    }

    // Return the user details
    return Ok(new
    {
      user.Id,
      user.UserName,
      user.Email,
      user.Role,
      user.Fname,
      user.Lname
    });
  }


  [HttpGet("list")]
  public async Task<IActionResult> GetUserList()
  {
    var users = await _context.Users
        .Select(u => new
        {
          u.Id,
          u.Fname,
          u.Lname,
          u.UserName,
          u.Email,
          u.PhoneNo,
          u.StateId,
          u.CityId,
          u.Pincode,
          u.Role
        })
        .ToListAsync();

    return Ok(new { message = "Success", data = users });
  }

  [HttpPost("change-password")]
  public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest model)
  {
    var user = await _context.Users.FindAsync(model.UserId);
    if (user == null)
    {
      return BadRequest(new { message = "User not found" });
    }

    user.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Password Changed Successfully" });
  }


  private string GenerateJwtToken(User user)
  {
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:Key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
        };

    var token = new JwtSecurityToken(
        _config["JwtSettings:Issuer"],
        _config["JwtSettings:Audience"],
        claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
  }

  [HttpPut("forgotPassword")]
  public async Task<IActionResult> UpdatePassword([FromBody] ForgotPasswordRequest request)
  {
    if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
    {
      return BadRequest(new { message = "Email and Password are required" });
    }

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

    if (user == null)
    {
      return NotFound(new { message = "User not found" });
    }

    // Hash password if required
    user.Password = request.Password;

    _context.Users.Update(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Password updated successfully" });
  }
}

// DTO for request data
public class ForgotPasswordRequest
{
  public string Email { get; set; }
  public string Password { get; set; }
}
// Models for request payloads
public class LoginRequest
{
  public string? EmailPhone { get; set; }
  public string? Password { get; set; }
}

public class RegisterRequest
{
  public int? Id { get; set; }
  public string Fname { get; set; }
  public string LName { get; set; }
  public string UserName { get; set; }
  public string Email { get; set; }
  public string PhoneNo { get; set; }
  public int StateId { get; set; }
  public int CityId { get; set; }
  public int? Pincode { get; set; }
  public string Role { get; set; }
  public string Password { get; set; }
}

public class ChangePasswordRequest
{
  public int UserId { get; set; }
  public string NewPassword { get; set; }
}
