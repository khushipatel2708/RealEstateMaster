using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Appointment
{
  public int Id { get; set; }

  public int PropertyId { get; set; }

  public int BuilderId { get; set; }

  public int UserId { get; set; }

  public int AvailabilityId { get; set; }

  public DateTime AppointmentDate { get; set; }

  public TimeOnly? StartTime { get; set; }

  public TimeOnly? EndTime { get; set; }

  public bool Status { get; set; }

  public DateTime? CreatedAt { get; set; }

  public virtual BuilderAvailability Availability { get; set; } = null!;

  public virtual User Builder { get; set; } = null!;

  public virtual Property Property { get; set; } = null!;

  public virtual User User { get; set; } = null!;
}
