namespace RealEstate.Models
{
  public class Email
  {
      public string SmtpServer { get; set; }
      public int Port { get; set; }
      public string SenderEmail { get; set; }
      public string SenderPassword { get; set; }
  }
}
