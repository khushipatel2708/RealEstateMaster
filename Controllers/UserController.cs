using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;

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

    //User GetList
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
        query = query.Where(m => m.Role.Contains(filters.SearchText) ||
                                 m.Fname.Contains(filters.SearchText) ||
                                 m.Lname.Contains(filters.SearchText) ||
                                 m.Email.Contains(filters.SearchText));
      }

      var totalCount = await query.OrderBy(m => m.Id).CountAsync();
      var data = await query.Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .Select(m => new
                            {
                              m.Id,
                              m.UserType,
                              m.IsAdmin,
                              m.UserName,
                              m.Fname,
                              m.Lname,
                              m.Password,
                              m.CreatedOn,
                              m.Status,
                              m.Email,
                              m.UpdatedOn,
                              m.CityId,
                              m.StateId,
                              m.Pincode,
                              m.PhoneNo,
                              m.Role
                            })
                            .ToListAsync();

      return Ok(new { data, totalCount });
    }

    //User Add Edit
    [HttpPost]
    public async Task<IActionResult> AddOrUpdateUser(UserViewModel user)
    {
      if (user == null)
      {
        return BadRequest(new { message = "Invalid user data" });
      }

      try
      {
        var u = await _context.Users.FindAsync(user.id);
        if (u != null)
        {
          // Update existing user
          u.UserType = user.userType;
          u.IsAdmin = user.isAdmin;
          u.Fname = user.fname;
          u.Lname = user.lname;
          u.Email = user.email;
          u.Password = user.password;
          u.UserName = user.userName;
          u.StateId = user.stateId;
          u.CityId = user.cityId;
          u.Pincode = user.pincode;
          u.PhoneNo = user.phoneNo;
          u.Role = user.role;
          u.CreatedOn = user.createdOn;
          u.UpdatedOn = user.updatedOn;
          u.Status = user.status;
          _context.Users.Update(u);
        }
        else
        {
          // Add new seru
          var newuser = new User
          {
            UserType = user.userType,
            IsAdmin = user.isAdmin,
            Fname = user.fname,
            Lname = user.lname,
            Email = user.email,
            Password = user.password,
            UserName = user.userName,
            StateId = user.stateId,
            CityId = user.cityId,
            Pincode = user.pincode,
            PhoneNo = user.phoneNo,
            Role = user.role,
            Status = user.status,
            CreatedOn = user.createdOn,
            UpdatedOn = user.updatedOn
          };

          _context.Users.Add(newuser);
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "user saved successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }

    [HttpPost("getRoleList")]
    public async Task<IActionResult> GetRoleList()
    {
      var data = await _context.Roles
          .Select(r => new
          {
            r.Id,
            r.Name,
          })
          .ToListAsync();

      return Ok(new { data });
    }

    // get by Id of user
    [HttpGet("{id}")]
    public async Task<IActionResult> GetuserById(int id)
    {
      var user = await _context.Users.FindAsync(id);
      if (user == null)
      {
        return NotFound(new { message = "user not found" });
      }

      return Ok(user);
    }

    // Delete user
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
          return NotFound(new { message = "user not found" });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "user deleted successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }
    //[HttpGet("GetUserDetails/{id}")]
    //public async Task<IActionResult> GetUserDetails(int id)
    //{
    //  var user = await _context.Users.FindAsync(id);
    //  if (user == null)
    //  {
    //    return NotFound(new { message = "User not found" });
    //  }
    //  return Ok(new
    //  {
    //    user.Id,
    //    user.UserName,
    //    user.Email,
    //    user.Role,
    //    user.Fname,
    //    user.Lname
    //  }); ;
    //}

    [HttpPut("updateProfile/{id}")]
    public async Task<IActionResult> updateProfile(int id, [FromBody] profile user)
    {
      if (user == null)
      {
        return BadRequest(new { message = "Invalid profile data" });
      }

      var u = await _context.Users.FindAsync(id);
      if (u == null)
      {
        return NotFound(new { message = "User not found" });
      }

      try
      {
        // Check if values are provided, otherwise keep existing
        //u.UserName = !string.IsNullOrEmpty(user.userName) ? user.userName : u.UserName;
        //u.Email = !string.IsNullOrEmpty(user.email) ? user.email : u.Email;
        //u.PhoneNo = !string.IsNullOrEmpty(user.phoneNo) ? user.phoneNo : u.PhoneNo;
        //u.Role = !string.IsNullOrEmpty(user.role) ? user.role : u.Role;
        //u.StateId = user.stateId != null ? user.stateId : u.StateId;
        //u.CityId = user.cityId != null ? user.cityId : u.CityId;
        //u.Pincode = user.pincode != null ? user.pincode : u.Pincode;
       
        u.Email = user.email;
        u.UserName = user.userName;
        u.StateId = user.stateId;
        u.CityId = user.cityId;
        u.Pincode = user.pincode;
        u.PhoneNo = user.phoneNo;
        u.Role = user.role;
     

        _context.Users.Update(u);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User profile updated successfully" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = ex.Message });
      }
    }



    public class UserFilter
    {
      public int Page { get; set; }
      public int PageSize { get; set; }
      public string? SearchText { get; set; }
    }

    public class profile
    {
      public string userName { get; set; }
      public string phoneNo { get;set; }
      public string email { get; set; }
      public string role { get; set; }
      public int? stateId { get; set; }
      public int? cityId { get; set; }
      public int? pincode { get; set; }

    }
  }
}
