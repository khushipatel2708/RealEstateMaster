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
  public async Task SendPaymentSuccessEmail(string toEmail, string transactionId, decimal amount, string customerEmail, string customerNumber)
  {
    try
    {
      var message = new MimeMessage();
      message.From.Add(new MailboxAddress("Your Business", "your-email@example.com"));
      message.To.Add(new MailboxAddress("", toEmail));
      message.Subject = "Payment of Transaction Id: " + transactionId + " is Successful";

      string emailBody = $@"
            <html>
            <body>
                <h2>Rs. {amount} Received!</h2>
                <p><strong>Transaction ID:</strong> {transactionId}</p>
                <p><strong>Customer Email:</strong> {customerEmail}</p>
                <p><strong>Customer Number:</strong> {customerNumber}</p>
                <p>Congratulations on yet another successful transaction. Thank you for using our service.</p>
            </body>
            </html>";

      var bodyBuilder = new BodyBuilder { HtmlBody = emailBody };
      message.Body = bodyBuilder.ToMessageBody();

      using var client = new SmtpClient();
      await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
      await client.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
      await client.SendAsync(message);
      await client.DisconnectAsync(true);
    }
    catch (Exception ex)
    {
      Console.WriteLine("Email sending failed: " + ex.Message);
    }
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
