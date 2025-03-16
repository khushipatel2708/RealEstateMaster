using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class PropertyOriginal
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Type { get; set; }

    public bool? IsActive { get; set; }
  public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
}
