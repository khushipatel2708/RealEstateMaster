namespace RealEstate.Models
{
  public class BuilderAvailabilityViewModel
  {
    public int Id { get; set; }

    public int BuilderId { get; set; }

    public DateTime AvailabilityDate { get; set; }

    public TimeSpan StartTime { get; set; }

    public TimeSpan EndTime { get; set; }

    public string Status { get; set; } = "AVAILABLE";

    public DateTime CreatedAt { get; set; }
  }
}
