using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;

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
  

  [HttpGet("{id}/notary")]
    public IActionResult GetPropertyNotary(int id)
    {
      var propertyDetails = _db.Properties
          .Where(w => w.Id == id)
          .Select(s => new
          {
            IsSociety=s.IsSociety,
            FlatNo=s.FlatNo,
            Locality=s.Locality,
            SocietyName=s.SocietyName,
            s.Pincode,
            s.PhoneNo,
            s.UserId,
            CityName = _db.Cities.Where(w => w.Id == s.CityId).Select(s => s.Name).FirstOrDefault(),
            StateName = _db.States.Where(w => w.Id == s.StateId).Select(s => s.Name).FirstOrDefault(),
            BuilderName = _db.Users.Where(w => w.Id == s.BuilderId).Select(s => s.Fname).FirstOrDefault(),
            PaymentDate = _db.Payments
                    .Where(w => w.FirstName == s.Slug)
                    .Select(s => (DateTime?)s.PaymentDate) // Retrieve DateTime as is
                    .FirstOrDefault(),
                    Email = _db.Payments
                    .Where(w => w.FirstName == s.Slug)
                    .Select(s => s.Email) // Retrieve DateTime as is
                    .FirstOrDefault()

          })
          .FirstOrDefault();
      var userDetails = _db.Users.Where(w => w.Email == propertyDetails.Email).Select(s => new { s.UserName, s.PhoneNo }).FirstOrDefault();

      if (propertyDetails == null)
      {
        return NotFound("Property not found.");
      }

      List<string> propertyParts = new List<string>();

      if (propertyDetails?.IsSociety == true)
      {
        propertyParts.Add(propertyDetails.FlatNo);
        propertyParts.Add(propertyDetails.SocietyName);
      }

      propertyParts.Add(propertyDetails.Locality);
      propertyParts.Add(propertyDetails.CityName);
      propertyParts.Add(propertyDetails.StateName);
      propertyParts.Add(propertyDetails.Pincode);

      var notary = new PropertyNotary
      {
        VendorName = propertyDetails.BuilderName, // Assign builder name to vendor
        VendorAadhar = "1234-5678-9012",  // Aadhaar remains unchanged
        VendorPan = "ABCDE1234F",         // PAN remains unchanged
        VendorMobile = propertyDetails.PhoneNo, // Assign PhoneNo to VendorMobile

        VendeeName = userDetails.UserName,
        VendeeAadhar = "5678-9012-3456",  // Aadhaar remains unchanged
        VendeePan = "XYZAB5678G",         // PAN remains unchanged
        VendeeMobile = userDetails.PhoneNo,
        PaymentDate = propertyDetails.PaymentDate ?? DateTime.MinValue,
        PropertyDetails = string.Join(", ", propertyParts.Where(x => !string.IsNullOrEmpty(x)))
      };

      return Ok(notary);
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
