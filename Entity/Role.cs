using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Role
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public int? Version { get; set; }

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
