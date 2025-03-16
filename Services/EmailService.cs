using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

public class EmailService
{
  private readonly RealEstate.Models.Email _emailSettings;

  public EmailService(IOptions<RealEstate.Models.Email> emailSettings)
  {
    _emailSettings = emailSettings.Value;
  }

  public async Task<bool> SendEmailAsync(string toEmail, string subject, string message)
  {
    try
    {
      var email = new MimeMessage();
      email.From.Add(new MailboxAddress("RealEstate Agency", _emailSettings.SenderEmail));
      email.To.Add(new MailboxAddress("", toEmail));
      email.Subject = subject;

      email.Body = new TextPart("html")
      {
        Text = message
      };

      using var smtp = new SmtpClient();
      await smtp.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
      await smtp.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
      await smtp.SendAsync(email);
      await smtp.DisconnectAsync(true);

      return true;
    }
    catch (Exception)
    {
      return false;
    }
  }
}
