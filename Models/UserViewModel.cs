namespace RealEstate.Models
{
  public class UserViewModel
  {
    public int? id { get; set; }

    public int? userType { get; set; }

    public bool? isAdmin { get; set; }

    public bool? status { get; set; }

    public DateTime? updatedOn { get; set; }

    public string fname { get; set; } = null!;

    public string lname { get; set; } = null!;

    public string userName { get; set; } = null!;

    public string email { get; set; } = null!;

    public string phoneNo { get; set; }

    public int? stateId { get; set; }

    public int? cityId { get; set; }

    public int? pincode { get; set; }

    public string? role { get; set; }

    public DateTime? createdOn { get; set; }

    public string password { get; set; } = null!;
  }
}
