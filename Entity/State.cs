using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class State
{
    public int? Id { get; set; }

    public string Name { get; set; } = null!;

    public bool? IsActive { get; set; }

    public DateTime? CreatedOn { get; set; }

  public virtual ICollection<City> Cities { get; set; } = new List<City>();

  public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

  //public virtual ICollection<User> Users { get; set; } = new List<User>();
}
