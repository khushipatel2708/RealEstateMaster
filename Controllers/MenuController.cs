using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;

namespace RealEstate.Controllers
{
  //[Authorize(Roles = "Admin")]
  [Route("api/menu")]
  [ApiController]
  public class MenuController : ControllerBase
  {
    private readonly RealEstateContext _context;

    public MenuController(RealEstateContext context)
    {
      _context = context;
    }


    // Get menu list

    [HttpPost("getMenuList")]
    public async Task<IActionResult> GetMenuList([FromBody] MenuFilter filters)
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

      var query = _context.Menus.AsQueryable();

      if (!string.IsNullOrWhiteSpace(filters.SearchText))
      {
        query = query.Where(m => m.Name.Contains(filters.SearchText) ||
                                 m.Title.Contains(filters.SearchText) ||
                                 m.Icon.Contains(filters.SearchText) ||
                                 m.Path.Contains(filters.SearchText));
      }

      var totalCount = await query.CountAsync();
      var data = await query.Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .Select(m => new { m.Id,m.Name, m.Title, m.Icon, m.Path })
                            .ToListAsync();

      return Ok(new { data, totalCount });
    }

    //add Edit in menu
    [HttpPost]
    public async Task<IActionResult> AddOrUpdateMenu(MenuViewModel menu)
    {
      if (menu == null)
      {
        return BadRequest(new { message = "Invalid menu data" });
      }

      try
      {
        var existingMenu = await _context.Menus.FindAsync(menu.Id);
        if (existingMenu != null)
        {
          // Update existing menu
          existingMenu.Name = menu.Name;
          existingMenu.Title = menu.Title;
          existingMenu.Icon = menu.Icon;
          existingMenu.Path = menu.Path;
          existingMenu.Version = menu.Version;

          _context.Menus.Update(existingMenu);
        }
        else
        {
          // Add new menu
          var newMenu = new Menu
          {
            Name = menu.Name,
            Title = menu.Title,
            Icon = menu.Icon,
            Path = menu.Path,
            Version = menu.Version
          };

          _context.Menus.Add(newMenu);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Menu saved successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }


    // get by Id of menu
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMenuById(int id)
    {
      var menu = await _context.Menus.FindAsync(id);
      if (menu == null)
      {
        return NotFound(new { message = "Menu not found" });
      }

      return Ok(menu);
    }

    // Delete menu
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMenu(int id)
    {
      try
      {
        var menu = await _context.Menus.FindAsync(id);
        if (menu == null)
        {
          return NotFound(new { message = "Menu not found" });
        }

        _context.Menus.Remove(menu);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Menu deleted successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
    [HttpGet("Menu")]
    public async Task<IActionResult> getMenuDdlList()
    {
      try
      {
        return Ok(await _context.Menus.ToListAsync());
      }catch(Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
  }
  
  public class MenuFilter
  {
    public int Page { get; set; } 
    public int PageSize { get; set; }
    public string? SearchText { get; set; }
  }

}
