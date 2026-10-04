using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using System.Security.Claims;
using static RealEstate.Controllers.AppointmentController;
namespace RealEstate.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AppointmentController : ControllerBase
  {
    private readonly RealEstateContext _context;

    public AppointmentController(
        RealEstateContext context)
    {
      _context = context;
    }

    public class CreateAppointmentDto
    {
      public int PropertyId { get; set; }

      public int BuilderId { get; set; }

      public int UserId { get; set; }

      public int AvailabilityId { get; set; }

      public DateTime AppointmentDate { get; set; }
    }

    //  [HttpPost("create")]
    //  public async Task<IActionResult> CreateAppointment(
    //          [FromBody] CreateAppointmentDto dto)
    //  {
    //    // 1. Check availability
    //    var availability = await _context.BuilderAvailabilities
    //        .FirstOrDefaultAsync(x =>
    //            x.Id == dto.AvailabilityId);

    //    if (availability == null)
    //    {
    //      return NotFound(new
    //      {
    //        message = "Availability slot not found."
    //      });
    //    }

    //    // 2. Check that availability belongs to the selected builder
    //    if (availability.BuilderId != dto.BuilderId)
    //    {
    //      return BadRequest(new
    //      {
    //        message = "Selected availability does not belong to this builder."
    //      });
    //    }

    //    // 3. Check if same slot is already booked
    //    var alreadyBooked = await _context.PropertyAppointments
    //        .AnyAsync(x =>
    //            x.AvailabilityId == dto.AvailabilityId &&
    //            x.AppointmentDate.Date == dto.AppointmentDate.Date &&
    //            x.Status == true);

    //    if (alreadyBooked)
    //    {
    //      return BadRequest(new
    //      {
    //        message = "This appointment slot is already booked."
    //      });
    //    }

    //    // 4. Create appointment
    //    var appointment = new PropertyAppointment
    //    {
    //      PropertyId = dto.PropertyId,

    //      BuilderId = dto.BuilderId,

    //      UserId = dto.UserId,

    //      AvailabilityId = dto.AvailabilityId,

    //      AppointmentDate = dto.AppointmentDate,

    //      StartTime = availability.StartTime,

    //      EndTime = availability.EndTime,

    //      Status = true,

    //      CreatedAt = DateTime.Now
    //    };

    //    // 5. Save
    //    _context.PropertyAppointments.Add(appointment);

    //    await _context.SaveChangesAsync();

    //    // 6. Return response
    //    return Ok(new
    //    {
    //      message = "Appointment booked successfully.",

    //      appointmentId = appointment.Id,

    //      propertyId = appointment.PropertyId,

    //      builderId = appointment.BuilderId,

    //      userId = appointment.UserId,

    //      availabilityId = appointment.AvailabilityId,

    //      appointmentDate = appointment.AppointmentDate,

    //      startTime = appointment.StartTime,

    //      endTime = appointment.EndTime,

    //      status = appointment.Status
    //    });
    //  }
    //}
    //}
    //    [HttpGet("property/{propertyId}/availability")]
    //    public async Task<IActionResult> GetPropertyAvailability(
    //       int propertyId)
    //    {
    //      /*
    //       * Property has builderId.
    //       *
    //       * So:
    //       *
    //       * Property
    //       *    ↓
    //       * Builder
    //       *    ↓
    //       * BuilderAvailability
    //       */


    //      var property =
    //          await _context.Properties
    //              .FirstOrDefaultAsync(
    //                  x => x.Id == propertyId
    //              );


    //      if (property == null)
    //      {
    //        return NotFound(new
    //        {
    //          message =
    //                "Property not found."
    //        });
    //      }


    //      int builderId =
    //          property.BuilderId;


    //      /*
    //       * Get builder availability
    //       *
    //       * AND remove already booked slots.
    //       */


    //      var availability =
    //          await _context.BuilderAvailabilities

    //              .Where(x =>

    //                  x.BuilderId == builderId &&

    //                  x.Status == "AVAILABLE" &&

    //                  !_context.PropertyAppointments.Any(
    //                      appointment =>

    //                          appointment.AvailabilityId ==
    //                              x.Id &&

    //                          appointment.Status ==
    //                              "BOOKED"
    //                  )
    //              )

    //              .OrderBy(x =>
    //                  x.AvailabilityDate)

    //              .ThenBy(x =>
    //                  x.StartTime)

    //              .ToListAsync();


    //      return Ok(availability);
    //    }


    //    // =====================================================
    //    // BOOK APPOINTMENT
    //    // =====================================================

    //    [HttpPost]
    //    public async Task<IActionResult> BookAppointment(
    //        [FromBody] PropertyAppointment appointment)
    //    {
    //      /*
    //       * 1. Find property
    //       */

    //      var property =
    //          await _context.Properties
    //              .FirstOrDefaultAsync(
    //                  x =>
    //                      x.Id ==
    //                      appointment.PropertyId
    //              );


    //      if (property == null)
    //      {
    //        return NotFound(new
    //        {
    //          message =
    //                "Property not found."
    //        });
    //      }


    //      /*
    //       * 2. Find availability
    //       */

    //      var availability =
    //          await _context.BuilderAvailabilities
    //              .FirstOrDefaultAsync(
    //                  x =>
    //                      x.Id ==
    //                      appointment.AvailabilityId
    //              );


    //      if (availability == null)
    //      {
    //        return NotFound(new
    //        {
    //          message =
    //                "Availability slot not found."
    //        });
    //      }


    //      /*
    //       * 3. Make sure the availability
    //       * belongs to this property's builder.
    //       */

    //      if (
    //          availability.BuilderId !=
    //          property.BuilderId
    //      )
    //      {
    //        return BadRequest(new
    //        {
    //          message =
    //                "Selected slot does not belong to this property builder."
    //        });
    //      }


    //      /*
    //       * 4. Check slot already booked
    //       */

    //      bool alreadyBooked =
    //          await _context.PropertyAppointments

    //              .AnyAsync(x =>

    //                  x.AvailabilityId ==
    //                      appointment.AvailabilityId &&

    //                  x.Status ==
    //                      "BOOKED"
    //              );


    //      if (alreadyBooked)
    //      {
    //        return Conflict(new
    //        {
    //          message =
    //                "This time slot is already booked."
    //        });
    //      }


    //      /*
    //       * 5. IMPORTANT
    //       *
    //       * Don't trust date/time/builderId
    //       * coming from Angular.
    //       *
    //       * Get them from availability/property.
    //       */


    //      appointment.BuilderId =
    //          property.BuilderId;


    //      appointment.AppointmentDate =
    //          availability.AvailabilityDate;


    //      appointment.StartTime =
    //          availability.StartTime;


    //      appointment.EndTime =
    //          availability.EndTime;


    //      appointment.Status =
    //          "BOOKED";


    //      appointment.CreatedAt =
    //          DateTime.UtcNow;


    //      /*
    //       * 6. Save appointment
    //       */

    //      _context.PropertyAppointments.Add(
    //          appointment
    //      );


    //      /*
    //       * 7. Mark slot as BOOKED
    //       */

    //      availability.Status =
    //          "BOOKED";


    //      await _context.SaveChangesAsync();


    //      return Ok(new
    //      {
    //        message =
    //              "Appointment booked successfully.",

    //        appointmentId =
    //              appointment.Id
    //      });
    //    }


    //    // =====================================================
    //    // GET USER APPOINTMENTS
    //    // =====================================================

    //    [HttpGet("user/{userId}")]
    //    public async Task<IActionResult> GetUserAppointments(
    //        int userId)
    //    {
    //      var appointments =
    //          await _context.PropertyAppointments

    //              .Where(x =>
    //                  x.UserId == userId)

    //              .OrderByDescending(x =>
    //                  x.AppointmentDate)

    //              .ToListAsync();


    //      return Ok(appointments);
    //    }


    //    // =====================================================
    //    // CANCEL APPOINTMENT
    //    // =====================================================

    //    [HttpPut("{id}/cancel")]
    //    public async Task<IActionResult> CancelAppointment(
    //        int id)
    //    {
    //      var appointment =
    //          await _context.PropertyAppointments
    //              .FirstOrDefaultAsync(
    //                  x => x.Id == id
    //              );


    //      if (appointment == null)
    //      {
    //        return NotFound(new
    //        {
    //          message =
    //                "Appointment not found."
    //        });
    //      }


    //      if (appointment.Status != "BOOKED")
    //      {
    //        return BadRequest(new
    //        {
    //          message =
    //                "This appointment cannot be cancelled."
    //        });
    //      }


    //      appointment.Status =
    //          "CANCELLED";


    //      /*
    //       * Make builder's slot available again.
    //       */

    //      var availability =
    //          await _context.BuilderAvailabilities

    //              .FirstOrDefaultAsync(
    //                  x =>
    //                      x.Id ==
    //                      appointment.AvailabilityId
    //              );


    //      if (availability != null)
    //      {
    //        availability.Status =
    //            "AVAILABLE";
    //      }


    //      await _context.SaveChangesAsync();


    //      return Ok(new
    //      {
    //        message =
    //              "Appointment cancelled successfully."
    //      });
    //    }
    //  }

    [HttpGet("available-slots/{propertySlug}/{date}")]
    public async Task<IActionResult> GetAvailableSlots(
      string propertySlug,
      DateOnly date)
    {
      // 1. Find property using slug
      var property = await _context.Properties
          .FirstOrDefaultAsync(p => p.Slug == propertySlug);

      if (property == null)
      {
        return NotFound(new
        {
          message = "Property not found."
        });
      }

      // 2. Get builder ID from property
      var builderId = property.BuilderId;

      // 3. Get availability of that builder for selected date
      var slots = await _context.BuilderAvailabilities
          .Where(a =>
              a.BuilderId == builderId &&
              a.AvailabilityDate == date &&
               a.Status == true
          )
          .OrderBy(a => a.StartTime)
          .Select(a => new
          {
            id = a.Id,
            builderId = a.BuilderId,
            availabilityDate = a.AvailabilityDate,
            startTime = a.StartTime,
            endTime = a.EndTime
          })
          .ToListAsync();

      return Ok(slots);
    }


    [HttpPost("create")]
    public async Task<IActionResult> CreateAppointment(
             [FromBody] CreateAppointmentViewModel dto)
    {
      // 1. Find Property using slug
      var property = await _context.Properties
          .FirstOrDefaultAsync(p => p.Slug == dto.PropertySlug);

      if (property == null)
      {
        return NotFound(new
        {
          message = "Property not found."
        });
      }


      // 2. Find selected availability
      var availability = await _context.BuilderAvailabilities
          .FirstOrDefaultAsync(a =>
              a.Id == dto.AvailabilityId);

      if (availability == null)
      {
        return NotFound(new
        {
          message = "Availability slot not found."
        });
      }


      // 3. Make sure availability belongs to
      //    property's builder
      if (availability.BuilderId != property.BuilderId)
      {
        return BadRequest(new
        {
          message = "Selected slot does not belong to this property builder."
        });
      }


      // 4. Check if slot is already booked
      var alreadyBooked = await _context.Appointments
          .AnyAsync(a =>
              a.AvailabilityId == dto.AvailabilityId &&
              a.AppointmentDate.Date == dto.AppointmentDate.Date &&
              a.Status == true);

      if (alreadyBooked)
      {
        return BadRequest(new
        {
          message = "This time slot is already booked."
        });
      }


      //return Ok(claims);

      // 5. Get logged-in UserId

      

      if (dto.userId == null)
      {
        return Unauthorized(new
        {
          message = "Invalid User ID."
        });
      }

      var user = await _context.Users
    .FirstOrDefaultAsync(u => u.Id == dto.userId);

      if (user == null)
      {
        return BadRequest(new
        {
          message = $"User with ID {dto.userId} does not exist."
        });
      }

      var builder = await _context.Users
    .FirstOrDefaultAsync(u =>
        u.Id == availability.BuilderId &&
        u.Role == "Builder");

      if (builder == null)
      {
        return BadRequest(new
        {
          message = "Builder not found."
        });
      }

      // 6. Create Appointment
      var appointment = new Appointment
      {
        PropertyId = property.Id,

        BuilderId = availability.BuilderId,
        Builder = builder,
        UserId = dto.userId,
        User = user,

        AvailabilityId = availability.Id,

        AppointmentDate = dto.AppointmentDate,

        StartTime = availability.StartTime,

        EndTime = availability.EndTime,

        Status = true,

        CreatedAt = DateTime.Now
      };
      availability.Status = false;
      Console.WriteLine(appointment);

      // 7. Save
      _context.Appointments.Add(appointment);

      await _context.SaveChangesAsync();


      // 8. Return response
      return Ok(new
      {
        message = "Appointment booked successfully.",

        appointmentId = appointment.Id,

        propertyId = appointment.PropertyId,

        builderId = appointment.BuilderId,

        userId = appointment.UserId,

        availabilityId = appointment.AvailabilityId,

        appointmentDate = appointment.AppointmentDate,

        startTime = appointment.StartTime,

        endTime = appointment.EndTime,

        status = appointment.Status
      });
    }

    [HttpGet("check/{propertyId}/{userId}")]
    public async Task<IActionResult> CheckAppointment(int propertyId,int userId)
    {
      foreach (var claim in User.Claims)
      {
        Console.WriteLine($"TYPE: {claim.Type} | VALUE: {claim.Value}");
      }

      var hasAppointment = await _context.Appointments
          .AnyAsync(a =>
              a.PropertyId == propertyId &&
              a.UserId == userId
          );

      return Ok(new
      {
        hasAppointment = hasAppointment
      });
    }

  }
}

  public class CreateAppointmentViewModel
  {
    public string PropertySlug { get; set; } = null!;

    public int AvailabilityId { get; set; }

    public DateTime AppointmentDate { get; set; }

    public int userId { get; set; }
  }


