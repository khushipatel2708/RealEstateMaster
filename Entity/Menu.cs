using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Menu
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? Title { get; set; }

    public string? Icon { get; set; }

    public string? Path { get; set; }

    public int? Version { get; set; }

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
