using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;

namespace RealEstate.Controllers
{
  //[Authorize(Roles = "Admin")]
  [Route("api/Permission")]
  [ApiController]
  public class PermissionController : ControllerBase
    {
    private readonly RealEstateContext _context;

    public PermissionController(RealEstateContext context)
    {
      _context = context;
    }

    [HttpGet("getPermissionList")]
    public async Task<IActionResult> GetPermissionList()
    {
      try
      {
        var permissions = await _context.Permissions.ToListAsync();
        return Ok(permissions);
      }
      catch
      {
        return StatusCode(500, new { message = "Error fetching permission list" });
      }
    }
    [HttpPost("postPermission")]
    public async Task<IActionResult> PostPermission([FromBody] List<Permission> permissions)
    {
      try
      {
        await _context.Permissions.AddRangeAsync(permissions);
        await _context.SaveChangesAsync();
        return StatusCode(201, new { message = "Permissions created successfully", permissions });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Error creating permissions", error = ex.Message });
      }
    }

    [HttpPost("deletePermission")]
    public async Task<IActionResult> DeletePermission([FromBody] List<PermissionDeleteDto> deleteData)
    {
      try
      {
        foreach (var data in deleteData)
        {
          var existingPermission = await _context.Permissions
              .FirstOrDefaultAsync(p => p.MenuId == data.MenuId && p.RoleId == data.RoleId);

          if (existingPermission != null)
          {
            _context.Permissions.Remove(existingPermission);
          }
        }
        await _context.SaveChangesAsync();
        return Ok(new { message = "Permissions deleted successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Error deleting permissions", error = ex.Message });
      }
    }
    [HttpGet("getMenuListByPermission/{role}")]
    public async Task<IActionResult> GetMenuListByPermission(string role)
    {
      try
      {
        var roleEntity = await _context.Roles.FirstOrDefaultAsync(r => r.Name == role);
        if (roleEntity == null)
        {
          return BadRequest(new { message = "Role not found" });
        }

        var menuIds = await _context.Permissions
            .Where(p => p.RoleId == roleEntity.Id)
            .Select(p => p.MenuId)
            .ToListAsync();

        var menuList = await _context.Menus
            .Where(m => menuIds.Contains(m.Id))
            .ToListAsync();

        return Ok(menuList);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    [HttpPost("menulist")]
    public async Task<IActionResult> getMenuListByRoleName(roleNameViewModel vm)
    {
      try
      {
        var roleId = await _context.Roles.Where(v => v.Name == vm.RoleName).Select(s => s.Id).FirstOrDefaultAsync();
        if(roleId == null)
        {
          return BadRequest("Select role for menulist.");
        }
        var menuIds = _context.Permissions.Where(w => w.RoleId == roleId).Select(s => s.MenuId).ToList();
        return Ok(_context.Menus.Where(w => menuIds.Contains(w.Id)).ToList());

      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
  }
  public class roleNameViewModel
  {
    public string? RoleName { get; set; }
  }
  public class PermissionDeleteDto
  {
    public int MenuId { get; set; }
    public int RoleId { get; set; }
  }
}
