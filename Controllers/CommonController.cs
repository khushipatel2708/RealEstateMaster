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

    public CommonController(IHttpContextAccessor contextAccessor, RealEstateContext context)
    {
      _contextAccessor = contextAccessor;
      _db = context;
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
    }
}
