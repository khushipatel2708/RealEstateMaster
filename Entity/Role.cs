using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Role
{
  public int Id { get; set; }

  public string? Name { get; set; }
  public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();

}
