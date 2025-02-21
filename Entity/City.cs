using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class City
{
    public int? Id { get; set; }

    public string? Name { get; set; }

    public int? StateId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedOn { get; set; }
}
