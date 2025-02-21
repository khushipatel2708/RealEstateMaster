using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class PropertyOriginal
{
    public string Id { get; set; } = null!;

    public string? Title { get; set; }

    public string? Type { get; set; }

    public bool? IsActive { get; set; }
}
