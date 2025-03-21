using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;

namespace RealEstate.Controllers
{
  [Route("api/builder")]
  [ApiController]
  public class BuilderController : ControllerBase
    {
    private readonly RealEstateContext _context;

    public BuilderController(RealEstateContext context)
    {
      _context = context;
    }

    [HttpGet("GetBuilderDDLList")]
    public async Task<IActionResult> GetBuilderDDLList()
    {
      var builders = await _context.Users.Where(w => w.Role == "builder").Select(s => new { s.Id,s.PhoneNo,s.Fname,s.State.Name,s.Lname,s.City,s.Email,
        PhotoPath = !string.IsNullOrEmpty(s.PhotoPath)
                ? $"{Request.Scheme}://{Request.Host}/{s.PhotoPath.TrimStart('/')}"  // Remove extra slashes
                : null
      }).ToListAsync();
      return Ok(builders);
    }

    [HttpPost("GetBuilderList")]
    public async Task<IActionResult> GetBuilderList([FromBody] BuilderFilter filter)
    {
      if (filter.Page < 1 || filter.PageSize < 1)
      {
        return BadRequest(new { message = "Invalid pagination parameters" });
      }

      var query = _context.Builders.AsQueryable();

      if (!string.IsNullOrEmpty(filter.SearchText))
      {
        query = query.Where(b => EF.Functions.Like(b.Fname, $"%{filter.SearchText}%") ||
                                 EF.Functions.Like(b.Lname, $"%{filter.SearchText}%") ||
                                 EF.Functions.Like(b.Location, $"%{filter.SearchText}%")||
                                 EF.Functions.Like(b.PhoneNo , $"%{filter.SearchText}%")||
                                 EF.Functions.Like(b.Email, $"%{filter.SearchText}%"));
      }

      var totalCount = await query.CountAsync();
      var data = await query
          .Select(b => new { b.Id, b.Fname, b.Lname, b.Email, b.Pincode, b.PhoneNo, b.Location })
          .Skip((filter.Page - 1) * filter.PageSize)
          .Take(filter.PageSize)
          .ToListAsync();

      return Ok(new { data, totalCount });
    }

    //[HttpPost]
    //public async Task<IActionResult> AddOrUpdateBuilder(BuilderViewModel builder)
    //{
    //  if (builder == null)
    //  {
    //    return BadRequest(new { message = "Invalid builder data" });
    //  }

    //  try
    //  {
    //    var existingBuilder = await _context.Builders.FindAsync(builder.Id);
    //    if (existingBuilder != null)
    //    {
    //      // Update existing builder
    //      existingBuilder.Fname = builder.Fname;
    //      existingBuilder.Lname = builder.Lname;
    //      existingBuilder.Email = builder.Email;
    //      existingBuilder.Password = builder.Password;
    //      existingBuilder.Pincode = builder.Pincode;
    //      existingBuilder.Location = builder.Location;
    //      existingBuilder.PhoneNo = builder.PhoneNo;
    //      existingBuilder.Version = builder.Version;

    //      _context.Builders.Update(existingBuilder);
    //    }
    //    else
    //    {
    //      // Add new builder
    //      var newBuilder = new Builder
    //      {
    //        Fname = builder.Fname,
    //        Lname = builder.Lname,
    //        Email = builder.Email,
    //        Password = builder.Password,
    //        Pincode = builder.Pincode,
    //        Location = builder.Location,
    //        PhoneNo = builder.PhoneNo,
    //        Version = builder.Version,

    //      };

    //      _context.Builders.Add(newBuilder);
    //    }

    //    await _context.SaveChangesAsync();
    //    return Ok(new { message = "Builder saved successfully" });
    //  }
    //  catch (Exception ex)
    //  {
    //    return StatusCode(500, new { message = ex.Message });
    //  }
    //}
    [HttpPost]
    public async Task<IActionResult> AddOrUpdateBuilder([FromForm] BuilderViewModel builder, IFormFile? photo)
    {
      if (builder == null)
      {
        return BadRequest(new { message = "Invalid builder data" });
      }

      try
      {
        string? photoPath = null;

        // Save Image if Uploaded
        if (photo != null && photo.Length > 0)
        {
          var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads","builders");
          if (!Directory.Exists(uploadsFolder))
          {
            Directory.CreateDirectory(uploadsFolder);
          }

          string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(photo.FileName);
          string filePath = Path.Combine(uploadsFolder, uniqueFileName);

          using (var stream = new FileStream(filePath, FileMode.Create))
          {
            await photo.CopyToAsync(stream);
          }

          photoPath = "/uploads/builders/" + uniqueFileName;
        }

        var existingBuilder = await _context.Builders.FindAsync(builder.Id);
        if (existingBuilder != null)
        {
          // Update existing builder
          existingBuilder.Fname = builder.Fname;
          existingBuilder.Lname = builder.Lname;
          existingBuilder.Email = builder.Email;
          existingBuilder.Password = builder.Password;
          existingBuilder.Pincode = builder.Pincode;
          existingBuilder.Location = builder.Location;
          existingBuilder.PhoneNo = builder.PhoneNo;
          existingBuilder.Version = builder.Version;

          // Update Photo if a new one was uploaded
          if (photoPath != null)
          {
            existingBuilder.PhotoPath = photoPath;
          }

          _context.Builders.Update(existingBuilder);
        }
        else
        {
          // Add new builder
          var newBuilder = new Builder
          {
            Fname = builder.Fname,
            Lname = builder.Lname,
            Email = builder.Email,
            Password = builder.Password,
            Pincode = builder.Pincode,
            Location = builder.Location,
            PhoneNo = builder.PhoneNo,
            Version = builder.Version,
            PhotoPath = photoPath
          };

          _context.Builders.Add(newBuilder);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Builder saved successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }

    //Get By Id builder
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBuilderById(int id)
    {
      var builder = await _context.Builders
          .Where(b => b.Id == id)
          .Select(b => new
          {
            b.Id,
            b.Fname,
            b.Lname,
            b.Email,
            b.Pincode,
            b.Location,
            b.Password,
            b.PhoneNo,
            PhotoPath = !string.IsNullOrEmpty(b.PhotoPath) ? $"http://localhost:5026{b.PhotoPath}" : null
          })
          .FirstOrDefaultAsync();

      if (builder == null)
      {
        return NotFound(new { message = "Builder not found" });
      }

      return Ok(builder);
    }


    //delete Builder

    // Delete menu
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBuilder(int id)
    {
      try
      {
        var builder = await _context.Builders.FindAsync(id);
        if (builder == null)
        {
          return NotFound(new { message = "Builder not found" });
        }

        _context.Builders.Remove(builder);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Builder deleted successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }

    public class BuilderFilter
    {
      public int Page { get; set; } = 1;
      public int PageSize { get; set; } = 20;
      public string? SearchText { get; set; }
    }

  }
}
