using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class User
{
    public string Id { get; set; } = null!;

    public int? UserType { get; set; }

    public bool? IsAdmin { get; set; }

    public bool? Status { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public string? Fname { get; set; } 

    public string? Lname { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; } 

    public string? PhoneNo { get; set; }

    public string? StateId { get; set; }

    public string? CityId { get; set; }

    public int? Pincode { get; set; }

    public string? Role { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string Password { get; set; } = null!;
}
