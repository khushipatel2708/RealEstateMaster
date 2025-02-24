using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;

namespace RealEstate.Controllers
{
  [Route("api/user")]
  [ApiController]
  public class UserController : ControllerBase
    {
    private readonly RealEstateContext _context;

    public UserController(RealEstateContext context)
    {
      _context = context;
    }
    [HttpPost("getUserList")]
    public async Task<IActionResult> GetUserList([FromBody] UserFilter filters)
    {
      if (filters == null)
      {
        return BadRequest(new { message = "Filters cannot be null" });
      }

      int page = filters.Page > 0 ? filters.Page : 1;
      int pageSize = filters.PageSize > 0 ? filters.PageSize : 20;

      if (page < 1 || pageSize < 1)
      {
        return BadRequest(new { message = "Invalid pagination parameters" });
      }

      var query = _context.Users.AsQueryable();

      if (!string.IsNullOrWhiteSpace(filters.SearchText))
      {
        query = query.Where(m => m.Fname.Contains(filters.SearchText) ||
                                 m.UserName.Contains(filters.SearchText) ||
                                 m.Email.Contains(filters.SearchText) ||
                                 m.Lname.Contains(filters.SearchText));
      }

      var totalCount = await query.CountAsync();
      var data = await query.Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .Select(m => new { m.Id, m.Fname,m.Lname,m.UserName,m.PhoneNo,m.Password,m.Pincode,m.Role,m.Email,m.Status })
                            .ToListAsync();

      return Ok(new { data, totalCount });
    }

  }


  public class UserFilter
  {
    public int Page { get; set; }
    public int PageSize { get; set; }
    public string? SearchText { get; set; }
  }
}
