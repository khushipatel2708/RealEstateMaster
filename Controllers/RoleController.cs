using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;
namespace RealEstate.Controllers
{
  [Route("api/role")]
  [ApiController]
  public class RoleController : ControllerBase
  {
    private readonly RealEstateContext _context;

    public RoleController(RealEstateContext context)
    {
      _context = context;
    }

    //[HttpPost("getRoleList")]

    //public async Task<IActionResult> GetRoleList([FromBody] RoleFilter filters)
    //{
    //  if (filters == null)
    //  {
    //    return BadRequest(new { message = "Filters cannot be null" });
    //  }

    //  int page = filters.Page > 0 ? filters.Page : 1;
    //  int pageSize = filters.PageSize > 0 ? filters.PageSize : 20;

    //  if (page < 1 || pageSize < 1)
    //  {
    //    return BadRequest(new { message = "Invalid pagination parameters" });
    //  }

    //  var query = _context.Roles.AsQueryable();

    //  if (!string.IsNullOrWhiteSpace(filters.SearchText))
    //  {
    //    query = query.Where(r => r.Name.Contains(filters.SearchText));
    //  }

    //  var totalCount = await query.CountAsync();

    //  var data = await _context.Roles
    //      .Select(r => new
    //      {
    //        r.Id,
    //        r.Name,
    //      })
    //      .ToListAsync();

    //  return Ok(new { data ,totalCount});
    //}
    [HttpPost("getRoleList")]
    public async Task<IActionResult> GetRoleList([FromBody] RoleFilter filters)
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

      var query = _context.Roles.AsQueryable();

      if (!string.IsNullOrWhiteSpace(filters.SearchText))
      {
        query = query.Where(r => r.Name.Contains(filters.SearchText));
      }

      var totalCount = await query.CountAsync();
      var data = await query
          .OrderBy(r => r.Name)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .Select(r => new
          {
            r.Id,
            r.Name,
          })
          .ToListAsync();

      return Ok(new { data, totalCount });
    }

    [HttpPost]
    public async Task<IActionResult> AddOrUpdateRole(RoleViewModel role)
    {
      if (role == null)
      {
        return BadRequest(new { message = "Invalid role data" });
      }


      var existingRole = await _context.Roles.FindAsync(role.id);
      if (existingRole != null)
      {
        // Update existing role
        existingRole.Name = role.name;

        _context.Roles.Update(existingRole);
      }
      else
      {
        // Add new role
        var newRole = new Role
        {
          Name = role.name,
        };
        _context.Roles.Add(newRole);
      }

      await _context.SaveChangesAsync();
      return Ok(new { message = "role saved successfully" });
      //catch (Exception ex)
      //{
      //  return StatusCode(500, new { message = ex.Message });
      //}
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRoleById(int id)
    {
      var role = await _context.Roles.FindAsync(id);
      if (role == null)
      {
        return NotFound(new { message = "role not found" });
      }

      return Ok(role);
    }

    // Delete role
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
      try
      {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
          return NotFound(new { message = "role not found" });
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        return Ok(new { message = "role deleted successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }

  }
  public class RoleFilter
  {
    public int Page { get; set; }
    public int PageSize { get; set; }
    public string? SearchText { get; set; }
  }
}
