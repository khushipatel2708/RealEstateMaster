using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class State
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public DateTime? CreatedOn { get; set; }
}
