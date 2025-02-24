using RealEstate.Entity;

namespace RealEstate.Models
{
  public interface LoginInterface
  {
    Task<User> GetUserByEmailOrPhone(string emailPhone);
    Task<User> GetUserById(int userId);
    Task<bool> UserExists(string email, string phoneNo);
    Task<User> CreateUser(User user);
    Task<IEnumerable<User>> GetAllUsers();
    Task UpdateUser(User user);

  }
}
