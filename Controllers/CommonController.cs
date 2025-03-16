using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;

namespace RealEstate.Controllers
{
  [ApiController]
  [Route("api/common")]
  public class CommonController : ControllerBase
  {
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly RealEstateContext _db;
    private readonly EmailService _emailService;
    public CommonController(IHttpContextAccessor contextAccessor, RealEstateContext context, EmailService emailService)
    {
      _contextAccessor = contextAccessor;
      _db = context;
      _emailService = emailService;
    }


    [HttpGet("state")]
    public async Task<IActionResult> GetStateList()
    {
      try
      {
        var states = await _db.States.Select(s => new
        {
          s.Id,
          s.Name
        }).ToListAsync();

        return Ok(states);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // ✅ Get all cities
    [HttpGet("cities")]
    public async Task<IActionResult> GetCityList()
    {
      try
      {
        var cities = await _db.Cities.Select(c => new
        {
          c.Id,
          c.Name,
          c.StateId
        }).ToListAsync();

        return Ok(cities);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    // ✅ Get cities by stateId
    [HttpGet("cities/{stateId}")]
    public async Task<IActionResult> GetCityListByState(int stateId)
    {
      try
      {
        var cities = await _db.Cities
            .Where(c => c.StateId == stateId)
            .Select(c => new
            {
              c.Id,
              c.Name,
              c.StateId
            })
            .ToListAsync();

        if (cities.Count == 0)
          return NotFound($"No cities found for stateId: {stateId}");

        return Ok(cities);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet("checkemail-availability/email/{email}")]
    public async Task<IActionResult> CheckEmailAvailability(string email)
    {
      try
      {
        var emailExists = await _db.Users.AnyAsync(u => u.Email == email);
        return Ok(new { response = !emailExists }); // true means email is available, false means taken
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("Role")]
    public async Task<IActionResult> getRoleDdlList()
    {
      try
      {
        return Ok(await _db.Roles.ToListAsync());
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
    [HttpGet("permissions/{roleId}")]
    public async Task<IActionResult> getPermissionByRoleIdList(int roleId)
    {
      try
      {
         
        return Ok(await _db.Permissions.Where(w => w.RoleId == roleId).Select(s => new { s.Id, s.RoleId, s.MenuId }).ToListAsync());
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
    [HttpPost("ContactUs")]
    public async Task<IActionResult> SendEmail([FromBody] ContactUsModel model)
    {
      if (model == null || string.IsNullOrWhiteSpace(model.Email))
      {
        return BadRequest("Invalid request");
      }

      string emailContent = $"<p><strong>Name:</strong> {model.Name}</p>" +
                            $"<p><strong>Email:</strong> {model.Email}</p>" +
                            $"<p><strong>Subject:</strong> {model.Subject}</p>" +
                            $"<p><strong>Message:</strong><br>{model.Message}</p>";

      bool isSent = await _emailService.SendEmailAsync(model.Email, model.Subject, emailContent);

      if (isSent)
      {
        return Ok(new { message = "Email sent successfully!" });
      }
      else
      {
        return StatusCode(500, "Failed to send email");
      }
    }
  }
}
public class ContactUsModel
{
  public string Name { get; set; }
  public string Email { get; set; }
  public string Subject { get; set; }
  public string Message { get; set; }
}
