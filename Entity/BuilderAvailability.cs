using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstate.Entity;

[Table("builder_availability")]
public partial class BuilderAvailability
{
  public int Id { get; set; }

  public int BuilderId { get; set; }

  public DateOnly AvailabilityDate { get; set; }

  public TimeOnly StartTime { get; set; }

  public TimeOnly EndTime { get; set; }

  public bool Status { get; set; }

  public DateTime? CreatedAt { get; set; }

  public virtual User? Builder { get; set; } = null!;

  //public virtual ICollection<PropertyAppointment> PropertyAppointments { get; set; } = new List<PropertyAppointment>();

  public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
