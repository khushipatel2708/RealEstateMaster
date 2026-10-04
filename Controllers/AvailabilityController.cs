using Microsoft.AspNetCore.Mvc;
using RealEstate.Entity;
using Microsoft.EntityFrameworkCore;
namespace RealEstate.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AvailabilityController : ControllerBase
  {
    private readonly RealEstateContext _context;

    public AvailabilityController(
        RealEstateContext context)
    {
      _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAvailability(
        [FromBody] BuilderAvailability availability)
    {
      if (availability.StartTime >= availability.EndTime)
      {
        return BadRequest(new
        {
          message = "End time must be greater than start time."
        });
      }


      // Check overlapping slots

      bool overlapping =
          await _context.BuilderAvailabilities.AnyAsync(x =>

              x.BuilderId == availability.BuilderId &&

              x.AvailabilityDate ==
                  availability.AvailabilityDate &&

              x.Status == true &&

              availability.StartTime < x.EndTime &&

              availability.EndTime > x.StartTime
          );


      if (overlapping)
      {
        return BadRequest(new
        {
          message =
                "This time slot overlaps with existing availability."
        });
      }


      availability.Status = true;

      availability.CreatedAt = DateTime.UtcNow;


      _context.BuilderAvailabilities.Add(
          availability
      );


      await _context.SaveChangesAsync();


      return Ok(new
      {
        message =
              "Availability created successfully.",

        data = availability
      });
    }


    // ==========================================
    // GET ALL BUILDER AVAILABILITY
    // ==========================================

    [HttpGet("builder/{builderId}")]
    public async Task<IActionResult> GetBuilderAvailability(
        int builderId)
    {
      var availability =
          await _context.BuilderAvailabilities

              .Where(x =>
                  x.BuilderId == builderId)

              .OrderBy(x =>
                  x.AvailabilityDate)

              .ThenBy(x =>
                  x.StartTime)

              .ToListAsync();


      return Ok(availability);
    }


    // ==========================================
    // GET AVAILABILITY FOR DATE
    // ==========================================

    [HttpGet("builder/{builderId}/date/{date}")]
    public async Task<IActionResult> GetAvailabilityByDate(
        int builderId,
        DateOnly date)
    {
      var availability =
          await _context.BuilderAvailabilities

              .Where(x =>

                  x.BuilderId == builderId &&

                  x.AvailabilityDate ==
                      date &&

                  x.Status == true
              )

              .OrderBy(x =>
                  x.StartTime)

              .ToListAsync();


      return Ok(availability);
    }


    // ==========================================
    // DELETE AVAILABILITY
    // ==========================================

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAvailability(
        int id)
    {
      var availability =
          await _context.BuilderAvailabilities
              .FindAsync(id);


      if (availability == null)
      {
        return NotFound(new
        {
          message =
                "Availability not found."
        });
      }


      // Check if slot is already booked

      //bool booked =
      //    await _context.PropertyAppointments.AnyAsync(
      //        x =>
      //            x.AvailabilityId == id &&
      //            x.Status == false
      //    );


      //if (booked)
      //{
      //  return BadRequest(new
      //  {
      //    message =
      //          "This slot is already booked."
      //  });
      //}


      _context.BuilderAvailabilities.Remove(
          availability
      );


      await _context.SaveChangesAsync();


      return Ok(new
      {
        message =
              "Availability deleted successfully."
      });
    }

    public class AvailabilityFilter
    {
      public string? SearchText { get; set; }

      public int Page { get; set; } = 1;

      public int PageSize { get; set; } = 10;
    }

    [HttpPost("GetAllAvailabilities")]
    public async Task<IActionResult> GetAllAvailabilities(
    [FromBody] AvailabilityFilter filter)
    {
      if (filter.Page < 1 || filter.PageSize < 1)
      {
        return BadRequest(new
        {
          message = "Invalid pagination parameters"
        });
      }

      var query =
          from a in _context.BuilderAvailabilities
          join u in _context.Users
              on a.BuilderId equals u.Id
          select new
          {
            a.Id,
            a.BuilderId,
            BuilderName = u.Fname,
            a.AvailabilityDate,
            a.StartTime,
            a.EndTime,
            a.Status,
            a.CreatedAt
          };

      // Search by builder name
      if (!string.IsNullOrEmpty(filter.SearchText))
      {
        query = query.Where(x =>
            EF.Functions.Like(
                x.BuilderName,
                $"%{filter.SearchText}%"
            )
        );
      }

      // Total records after filtering
      var totalCount = await query.CountAsync();

      // Pagination
      var data = await query
          .OrderBy(x => x.AvailabilityDate)
          .ThenBy(x => x.StartTime)
          .Skip(
              (filter.Page - 1) * filter.PageSize
          )
          .Take(filter.PageSize)
          .ToListAsync();

      return Ok(new
      {
        data,
        totalCount
      });
    }
  }
}
