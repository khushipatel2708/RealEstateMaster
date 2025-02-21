using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Permission
{
    public string Id { get; set; } = null!;

    public string? RoleId { get; set; }

    public string? MenuId { get; set; }

    public int? Version { get; set; }

    public virtual Menu? Menu { get; set; }

    public virtual Role? Role { get; set; }
}
