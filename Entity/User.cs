using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class User
{
  public int Id { get; set; }

  public int? UserType { get; set; }

  public bool? IsAdmin { get; set; }

  public bool? Status { get; set; }

  public DateTime? UpdatedOn { get; set; }

  public string Fname { get; set; } = null!;

  public string Lname { get; set; } = null!;

  public string UserName { get; set; } = null!;

  public string Email { get; set; } = null!;

  public string? PhoneNo { get; set; }

  public int? StateId { get; set; }

  public int? CityId { get; set; }

  public int? Pincode { get; set; }

  public string? Role { get; set; }

  public DateTime? CreatedOn { get; set; }

  public string Password { get; set; } = null!;

  public string? PhotoPath { get; set; }

  public virtual City? City { get; set; }

  public virtual ICollection<Property> PropertyBuilders { get; set; } = new List<Property>();

  public virtual ICollection<Property> PropertyUsers { get; set; } = new List<Property>();

  public virtual State? State { get; set; }
}
