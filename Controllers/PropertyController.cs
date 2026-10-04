using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Hubs;
using RealEstate.Models;
using RealEstate.Services;
using System.Text.RegularExpressions;


namespace RealEstate.Controllers
{
  [Route("api/property")]
  [ApiController]
  public class PropertyController : ControllerBase
  {
    private readonly RealEstateContext _context;
    private readonly IHubContext<NotificationHub> _notificationHub;
    private readonly SmsService _smsService;
    public PropertyController(RealEstateContext context, SmsService smsService, IHubContext<NotificationHub> notificationHub)
    {
      _context = context;
      _notificationHub = notificationHub;
      _smsService = smsService;
    }

    private async Task<string> GenerateSlug(string title)
    {
      if (string.IsNullOrWhiteSpace(title))
        throw new ArgumentNullException(nameof(title));

      var slug = Regex.Replace(title.ToLower(), @"[^a-z0-9\s-]", "")
                      .Replace(" ", "-")
                      .Trim('-');

      return await Task.FromResult($"{slug}-{Guid.NewGuid()}");
    }


    [HttpPost("new")]
    public async Task<IActionResult> AddNewProperty([FromForm] PropertyViewModel model)
    {
      try
      {
        var images = new List<string>();
        var directoryPath = Path.Combine("wwwroot", "properties");

        // Ensure the directory exists
        if (!Directory.Exists(directoryPath))
        {
          Directory.CreateDirectory(directoryPath);
        }

        if (Request.Form.Files.Count > 0)
        {
          foreach (var file in Request.Form.Files)
          {
            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(directoryPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
              await file.CopyToAsync(stream);
            }

            var imageUrl = $"/properties/{fileName}";
            images.Add(imageUrl);
          }
        }

        var slug = await GenerateSlug(model.Title ?? throw new ArgumentNullException(nameof(model.Title)));

        var property = new Property
        {
          Title = model.Title,
          Slug = slug,
          TypeId = model.TypeId,
          CornerPlot = model.CornerPlot ?? false,
          IsSociety = model.IsSociety,
          FlatNo = model.IsSociety == true ? model.FlatNo : string.Empty,
          SocietyName = model.IsSociety == true ? model.SocietyName : string.Empty,
          Address = model.Address,
          CityId = model.CityId,
          StateId = model.StateId,
          Pincode = model.Pincode,
          Locality = model.Locality,
          Description = model.Description,
          Price = model.Price,
          UserId = model.BuilderId != null ? model.BuilderId : model.UserId,
          CreatedOn = DateTime.UtcNow,
          UpdatedOn = DateTime.UtcNow,
          PropertyFor = model.PropertyFor,
          Status = "available",
          IsActive = model.IsActive ?? true,
          Email = model.Email,
          PhoneNo = model.PhoneNo,
          Length = model.Length,
          Breadth = model.Breadth,
          BuilderId = model.BuilderId,
          Version = model.Version,
          AgencyName = model.AgencyName,
          Images = string.Join(",", images)
        };

        _context.Properties.Add(property);
        await _context.SaveChangesAsync();

        return Ok(new { property, message = "Your property has been successfully posted" });
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex);
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost("propertyList")]
    public async Task<IActionResult> GetPropertyList([FromBody] PropertyFilter filter)
    {
      try
      {
        var query = _context.Properties.AsQueryable();

        if (!string.IsNullOrEmpty(filter.PropertyFor))
        {
          query = query.Where(p => p.PropertyFor == filter.PropertyFor);
        }

        if (filter.Type.HasValue && filter.Type > 0) // If Type is nullable int
        {
          query = query.Where(p => p.TypeId == filter.Type.Value);
        }

        if (!string.IsNullOrEmpty(filter.SearchText))
        {
          query = query.Where(p => p.Description.Contains(filter.SearchText) ||
                                   p.Title.Contains(filter.SearchText));
        }

        var totalCount = await query.CountAsync();

        var page = filter.Page ?? 1;
        var pageSize = filter.PageSize ?? 20;

        var properties = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new
        {
          TotalCount = totalCount,
          Data = properties
        });
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPost("markAsSold/{propertySlug}")]
    public async Task<IActionResult> MarkAsSold(string propertySlug, [FromBody] PropertyUpdateRequest request)
    {
      try
      {
        var property = await _context.Properties.FirstOrDefaultAsync(p => p.Slug == propertySlug);

        if (property == null)
        {
          return NotFound(new { message = "Property not found" });
        }

        property.Status = request.Status;
        await _context.SaveChangesAsync();

        return Ok(new { property, message = "Property has been updated successfully" });
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("propertyTypeList")]
    public IActionResult GetActivePropertyTypes()
    {
      try
      {
        var result = _context.PropertyOriginals
            .Where(p => p.IsActive == true)
            .ToList();

        if (result == null || !result.Any())
        {
          return NotFound("No active property types found.");
        }

        return Ok(result);
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Internal server error: {ex.Message}");
      }
    }

    [HttpDelete("deleteProperty/{id}")]
    public async Task<IActionResult> DeleteProperty(int id)
    {
      if (id <= 0)
      {
        return BadRequest(new { message = "Invalid Property ID format" });
      }

      try
      {
        var property = await _context.Properties.FindAsync(id);
        if (property == null)
        {
          return NotFound(new { message = "Property not found" });
        }

        _context.Properties.Remove(property);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Property removed successfully" });
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = "Error deleting property", error = ex.Message });
      }
    }

    [HttpGet("getSingleProperty/{propertySlug}/{email}")]
    public async Task<IActionResult> GetSingleProperty(string propertySlug,string email)
    {
      try
      {
        var decodedSlug = Uri.UnescapeDataString(propertySlug); // Decode slug
        var trimmedSlug = decodedSlug.Split('-').TakeWhile(part => !Guid.TryParse(part, out _)).ToList();
        var cleanSlug = string.Join("-", trimmedSlug);

        var property = await _context.Properties
            .Include(p => p.City)
            .Include(p => p.Type)
            .Include(p => p.State)
            .Include(p => p.Builder)
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Slug.StartsWith(cleanSlug));
        var paymentRecord = await _context.Payments
            .FirstOrDefaultAsync(p => p.FirstName == property.Slug);

        bool isEmailMatched = paymentRecord != null &&
                              string.Equals(paymentRecord.Email, email, StringComparison.OrdinalIgnoreCase);

        if (property == null)
        {
          return NotFound(new { message = "Property not found" });
        }

        string agencyName = null;
        //if (property.User != null) // If User is the Agency
        //{
        //  agencyName = property.User.Fname; // Replace 'Fname' with actual column if needed
        //}

        var files = new List<string>();
        if (!string.IsNullOrEmpty(property.Images))
        {
          files = property.Images.Split(',').Select(img => $"{Request.Scheme}://{Request.Host}{img}").ToList();
        }

        var result = new
        {
          property.Id,
          property.Title,
          property.Images,
          property.Slug,
          property.Status,
          property.Price,
          property.Description,
          property.Address,
          property.Email,
          property.PhoneNo,
          property.Length,
          property.Breadth,
          property.Pincode,
          property.Locality,
          property.CornerPlot,
          property.SocietyName,
          property.FlatNo,
          property.CityId,
          property.StateId,
          property.BuilderId,
          AgencyName = property.AgencyName, // Avoid direct reference to non-existing column
          property.TypeId,
          property.UserId,
          property.PropertyFor,
          City = property.City?.Name,
          State = property.State?.Name,
          Builder = property.User?.Fname,
          Type = property.Type?.Title,
          User = new
          {
            property.User?.Id,
            property.User?.Fname,
            property.User?.Lname,
            property.User?.Email,
            property.User?.Role,
          },
          files, // Formatted image URLs
          isEmailMatched
        };

        return Ok(new { result });
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message, stackTrace = ex.StackTrace });
      }
    }

    [HttpPost("getpropertyList12")]
    public async Task<IActionResult> GetPropertyList1([FromBody] PropertyFilter filter)
    {
      try
      {
        var scheme = Request.Scheme;
        var host = Request.Host.ToString();

        var query = from property in _context.Properties
                    join city in _context.Cities on property.CityId equals city.Id
                    join type in _context.PropertyOriginals on property.TypeId equals type.Id
                    select new
                    {
                      property.Id,
                      property.Price,
                      property.Description,
                      property.Title,
                      city = city.Name,
                      type = type.Title,
                      property.Locality,
                      property.PropertyFor,
                      property.TypeId,
                      property.Status,
                      property.Slug,
                      property.Images,
                      property.CityId,
                      property.UserId,
                      property.Email,
                    };

        if (!string.IsNullOrEmpty(filter.PropertyFor))
        {
          query = query.Where(p => p.PropertyFor == filter.PropertyFor);
        }

        if (filter.Type.HasValue && filter.Type > 0)
        {
          query = query.Where(p => p.TypeId == filter.Type.Value);
        }

        if (filter.CityId.HasValue && filter.CityId > 0)
        {
          query = query.Where(p => p.CityId == filter.CityId.Value);
        }
        if (!string.IsNullOrEmpty(filter.Status))
        {
          query = query.Where(p => p.Status == filter.Status);
        }


        if (!string.IsNullOrEmpty(filter.SearchText))
        {
          query = query.Where(p => p.Description.Contains(filter.SearchText) ||
                                   p.Title.Contains(filter.SearchText));
        }

        var totalCount = await query.CountAsync();

        var page = filter.Page ?? 1;
        var pageSize = filter.PageSize ?? 20;

        var properties = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var result = properties.Select(p => new
        {
          p.Id,
          p.Price,
          p.Description,
          p.Title,
          p.city,
          p.type,
          p.Locality,
          p.PropertyFor,
          p.TypeId,
          p.Status,
          p.Slug,
          p.UserId,
          p.Email,
          Images = !string.IsNullOrEmpty(p.Images)
        ? p.Images.Split(',').Select(img => $"{scheme}://{host}{img}").ToList()
        : new List<string>()
        }).ToList();

        return Ok(new
        {
          TotalCount = totalCount,
          Data = result
        });
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpPut("edit/{id}")]
    public async Task<IActionResult> EditProperty(int id, [FromForm] PropertyViewModel dataToSend, [FromForm] List<IFormFile> propImages)
    {
      try
      {
        var property = await _context.Properties.FindAsync(id);
        if (property == null)
        {
          return NotFound(new { message = "Property not found" });
        }

        // Update property fields
        property.Title = dataToSend.Title;
        property.Images = dataToSend.Images;
        property.PropertyFor = dataToSend.PropertyFor;
        property.TypeId = dataToSend.TypeId;
        property.StateId = dataToSend.StateId;
        property.CityId = dataToSend.CityId;
        property.Locality = dataToSend.Locality;
        property.Description = dataToSend.Description;
        property.Address = dataToSend.Address;
        property.Email = dataToSend.Email;
        property.PhoneNo = dataToSend.PhoneNo;
        property.Pincode = dataToSend.Pincode;
        property.CornerPlot = dataToSend.CornerPlot ?? false;
        property.BuilderId = dataToSend.UserId;
        property.UserId = dataToSend.UserId;
        property.AgencyName = dataToSend.AgencyName;

        if (!string.IsNullOrEmpty(dataToSend.Title))
        {
          property.Slug = await GenerateSlug(dataToSend.Title);
        }

        // Handling Images
        if (propImages != null && propImages.Count > 0)
        {
          var imagePaths = new List<string>();
          foreach (var image in propImages)
          {
            var filePath = Path.Combine("wwwroot/uploads/properties", image.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
              await image.CopyToAsync(stream);
            }
            imagePaths.Add($"/uploads/properties/{image.FileName}");
          }

          property.Images = string.Join(",", imagePaths);
        }

        _context.Properties.Update(property);
        await _context.SaveChangesAsync();

        return Ok(new { updatedProperty = property, message = "Property has been successfully updated." });
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("filterProperties")]
    public async Task<IActionResult> FilterProperties([FromQuery] string propertyFor = "", [FromQuery] string type = "", [FromQuery] string city = "", [FromQuery] int userId = 0, [FromQuery] int notUserId = 0, [FromQuery] string status = "")
    {
      try
      {
        var query = _context.Properties.AsQueryable();

        var propertyForList = !string.IsNullOrEmpty(propertyFor) ? propertyFor.Split(',') : Array.Empty<string>();
        var typeList = !string.IsNullOrEmpty(type) ? type.Split(',') : Array.Empty<string>();
        var cityList = !string.IsNullOrEmpty(city) ? city.Split(',') : Array.Empty<string>();
        var statusList = !string.IsNullOrEmpty(status) ? status.Split(',') : Array.Empty<string>();

        if (propertyForList.Any())
          query = query.Where(p => propertyForList.Contains(p.PropertyFor));

        if (typeList.Any())
          query = query.Where(p => typeList.Contains(p.TypeId.ToString()));

        if (cityList.Any())
          query = query.Where(p => cityList.Contains(p.CityId.ToString()));

        if (userId != 0)
          query = query.Where(p => p.UserId == userId);

        if (notUserId != 0)
          query = query.Where(p => p.UserId != notUserId);

        if (statusList.Any())
          query = query.Where(p => statusList.Contains(p.Status));

        var result = await query.Include(p => p.City)
                                .Include(p => p.State)
                                .Include(p => p.Type)
                                .Include(p => p.User)
                                .Select(p => new PropertyViewModel
                                {
                                  Id = p.Id,
                                  Locality = p.Locality,
                                  PropertyFor = p.PropertyFor,
                                  Status = p.Status,
                                  CityId = p.CityId,
                                  StateId = p.StateId,
                                  TypeId = p.TypeId,
                                  UserId = p.UserId,
                                  Title = p.Title,
                                  Price = p.Price,
                                  Slug = p.Slug,
                                  CornerPlot = p.CornerPlot,
                                  Length = p.Length,
                                  Breadth = p.Breadth,

                                }).ToListAsync();

        return Ok(result);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }

    [HttpGet]
    public async Task<IActionResult> getPropertyList([FromQuery] string city = null, [FromQuery] string propertyType = null, [FromQuery] string priceRange = null)
    {
      try
      {
        var baseUrl = "http://localhost:5026"; // Define base URL
        var propertiesQuery = _context.Properties
            .Include(p => p.Builder)
            .Include(p => p.State)
            .Include(p => p.City)
            .AsQueryable();

        // Apply filters if query parameters exist
        if (!string.IsNullOrEmpty(city))
          propertiesQuery = propertiesQuery.Where(p => p.City.Name == city);

        if (!string.IsNullOrEmpty(propertyType))
          propertiesQuery = propertiesQuery.Where(p => p.Type.Title == propertyType);

        if (!string.IsNullOrEmpty(priceRange))
        {
          if (priceRange == "< ₹50 Lakh")
            propertiesQuery = propertiesQuery.Where(p => p.Price < 5000000);
          else if (priceRange == "₹50 Lakh - ₹1 Crore")
            propertiesQuery = propertiesQuery.Where(p => p.Price >= 5000000 && p.Price <= 10000000);
          else if (priceRange == "₹1 Crore - ₹2 Crore")
            propertiesQuery = propertiesQuery.Where(p => p.Price > 10000000 && p.Price <= 20000000);
          else if (priceRange == "> ₹2 Crore")
            propertiesQuery = propertiesQuery.Where(p => p.Price > 20000000);
        }

        var properties = await propertiesQuery
            .Select(s => new
            {
              s.Id,
              s.Title,
              s.Price,
              s.Images, // Using Images column
              BuilderFname = s.Builder.Fname,
              BuilderPhoneNo = s.Builder.PhoneNo,
              StateName = s.State.Name,
              CityName = s.City.Name,
              PropertyType = s.Type.Title,
              Role = s.User.Role ?? "admin",
              s.Status,
              s.AgencyName,
              s.Slug
            })
            .AsNoTracking()
            .ToListAsync(); // Fetch data first

        // Process image URLs after fetching data
        var propertyList = properties.Select(s => new
        {
          s.Id,
          s.Title,
          s.Price,
          s.BuilderFname,
          s.BuilderPhoneNo,
          s.StateName,
          s.CityName,
          s.PropertyType,
          s.Status,
          s.AgencyName,
          s.Slug,
          s.Role,
          ImageUrls = !string.IsNullOrEmpty(s.Images)
                ? s.Images.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                          .Select(img => $"{baseUrl}{img.Trim()}")
                          .ToList()
                : new List<string>() // If no images, return an empty list
        }).ToList();

        return Ok(propertyList);
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
      }
    }

    [HttpPost("uploadPropertyImage")]
    public async Task<IActionResult> UploadPropertyImage(IFormFile file)
    {
      try
      {
        if (file == null || file.Length == 0)
        {
          return BadRequest("No file uploaded.");
        }

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        if (!Directory.Exists(uploadsFolder))
        {
          Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
          await file.CopyToAsync(stream);
        }

        var imageUrl = $"/uploads/{uniqueFileName}";

        return Ok(new { imageUrl });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Internal server error", error = ex.Message });
      }
    }

    [HttpGet("GetPropertyContactDetails/{propertyId}/{userId}")]
    public async Task<IActionResult> GetPropertyContactDetails(int propertyId, int userId)
    {
      var property = await _context.Properties
                                   .Where(p => p.Id == propertyId)
                                   .Select(p => new
                                   {
                                     Phone = p.PhoneNo,
                                     Email = p.Email,
                                     BuilderPhone = p.PhoneNo,
                                     BuilderId = p.BuilderId
                                   })
                                   .FirstOrDefaultAsync();
      var user = await _context.Users
                         .Where(u => u.Id == userId)
                         .Select(u => new
                         {
                           u.Fname,
                           u.PhoneNo
                         })
                         .FirstOrDefaultAsync();
      if (user == null)
      {
        return NotFound(new { message = "User details not found." });
      }

      string smsMessage = $"User {user.Fname} (Phone: {user.PhoneNo}) is interested in Property ID {propertyId}.";
      await _smsService.SendSmsAsync(property.BuilderPhone, smsMessage);

      await _notificationHub.Clients.All.SendAsync("ReceiveNotification", smsMessage);

      if (property == null)
      {
        return NotFound(new { message = "Property contact details not found." });
      }

      return Ok(new { phone = property.Phone, email = property.Email });
    }

    [HttpGet("{propertySlug}/user-appointment")]
    public async Task<IActionResult> GetUserAppointment(
    string propertySlug,
    [FromQuery] int userId)
    {
      var property = await _context.Properties
          .FirstOrDefaultAsync(p => p.Slug == propertySlug);

      if (property == null)
        return NotFound(new { message = "Property not found." });

      var appointment = await _context.Appointments
          .Where(a =>
              a.PropertyId == property.Id &&
              a.UserId == userId &&
              a.Status == true)
          .OrderByDescending(a => a.AppointmentDate)
          .FirstOrDefaultAsync();

      if (appointment == null)
      {
        return Ok(null);
      }

      return Ok(new
      {
        appointmentId = appointment.Id,
        appointmentDate = appointment.AppointmentDate,
        propertyId = appointment.PropertyId,
        status = appointment.Status
      });
    }

  }

  public class PropertyFilter
  {
    public string? PropertyFor { get; set; }
    public string? Status { get; set; }
    public int? Type { get; set; }
    public int? CityId { get; set; }
    public string? SearchText { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
  }
  public class PropertyUpdateRequest
  {
    public string Status { get; set; }
  }
}


