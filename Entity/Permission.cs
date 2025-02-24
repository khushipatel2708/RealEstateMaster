using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Permission
{
  public int Id { get; set; }

  public int? RoleId { get; set; }

  public int? MenuId { get; set; }

  public int? Version { get; set; }

  public virtual Menu? Menu { get; set; }

  public virtual Role? Role { get; set; }
}
