namespace RealEstate.Models
{
  public class PropertyAppointmentViewModel
  {
    public int Id { get; set; }

    public int PropertyId { get; set; }

    public int BuilderId { get; set; }

    public int UserId { get; set; }

    public int AvailabilityId { get; set; }

    public DateTime AppointmentDate { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }

    public string Status { get; set; } = "BOOKED";

    public string? Remarks { get; set; }

    public DateTime CreatedAt { get; set; }
  }
}
