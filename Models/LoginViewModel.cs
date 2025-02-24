namespace RealEstate.Models
{
  public class LoginViewModel
  {
    public string EmailPhone { get; set; }
    public string Password { get; set; }
  }
  public class RegisterRequest
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNo { get; set; }
    public string State { get; set; }
    public string City { get; set; }
    public string Pincode { get; set; }
    public string Role { get; set; }
    public string Password { get; set; }
  }

  public class ChangePasswordRequest
  {
    public int UserId { get; set; }
    public string NewPassword { get; set; }
  }
}
