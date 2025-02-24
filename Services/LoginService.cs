using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;
using RealEstate.Models;

namespace RealEstate.Services
{
  public class LoginService : LoginInterface
  {
    private readonly RealEstateContext _db;

    public LoginService(RealEstateContext context)
    {
      _db = context;
    }

    public async Task<User> GetUserByEmailOrPhone(string emailPhone)
    {
      return await _db.Users.FirstOrDefaultAsync(u => u.Email == emailPhone || u.PhoneNo == emailPhone);
    }

    public async Task<User> GetUserById(int userId)
    {
      return await _db.Users.FindAsync(userId);
    }

    public async Task<bool> UserExists(string email, string phoneNo)
    {
      return await _db.Users.AnyAsync(u => u.Email == email || u.PhoneNo == phoneNo);
    }

    public async Task<User> CreateUser(User user)
    {
      _db.Users.Add(user);
      await _db.SaveChangesAsync();
      return user;
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
      return await _db.Users.ToListAsync();
    }

    public async Task UpdateUser(User user)
    {
      _db.Users.Update(user);
      await _db.SaveChangesAsync();
    }
  }

}
