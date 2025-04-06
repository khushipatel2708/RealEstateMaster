using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RealEstate.Entity;

public class EmailService
{
  private readonly RealEstate.Models.Email _emailSettings;
  private readonly RealEstateContext _context;

  public EmailService(IOptions<RealEstate.Models.Email> emailSettings, RealEstateContext context)
  {
    _emailSettings = emailSettings.Value;
    _context = context;
  }
  //public async Task SendPaymentSuccessEmail(string toEmail, string transactionId, decimal amount, string customerEmail, string customerNumber)
  //{
  //  try
  //  {
  //    var message = new MimeMessage();
  //    message.From.Add(new MailboxAddress("Your Business", "your-email@example.com"));
  //    message.To.Add(new MailboxAddress("", toEmail));
  //    message.Subject = "Payment of Transaction Id: " + transactionId + " is Successful";

  //    string emailBody = $@"
  //          <html>
  //          <body>
  //              <h2>Rs. {amount} Received!</h2>
  //              <p><strong>Transaction ID:</strong> {transactionId}</p>
  //              <p><strong>Customer Email:</strong> {customerEmail}</p>
  //              <p><strong>Customer Number:</strong> {customerNumber}</p>
  //              <p>Congratulations on yet another successful transaction. Thank you for using our service.</p>
  //          </body>
  //          </html>";

  //    var bodyBuilder = new BodyBuilder { HtmlBody = emailBody };
  //    message.Body = bodyBuilder.ToMessageBody();

  //    using var client = new SmtpClient();
  //    await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
  //    await client.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
  //    await client.SendAsync(message);
  //    await client.DisconnectAsync(true);
  //  }
  //  catch (Exception ex)
  //  {
  //    Console.WriteLine("Email sending failed: " + ex.Message);
  //  }
  //}
  public async Task SendPaymentSuccessEmail(string toEmail, string transactionId, decimal amount, string customerEmail, string propertyId)
  {
    try
    {
      var property = await _context.Properties
          .Where(p => p.Slug == propertyId)
          .Select(p => new
          {
            p.Id,
            p.Title,
            p.Address
          })
          .FirstOrDefaultAsync();

      if (property == null)
      {
        Console.WriteLine("Property not found. Skipping email.");
        return;
      }

      var message = new MimeMessage();
      message.From.Add(new MailboxAddress("Your Business", _emailSettings.SenderEmail));
      message.To.Add(new MailboxAddress("", toEmail));
      message.Subject = $"Payment of Transaction ID: {transactionId} is Successful";

      string emailBody = $@"
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; }}
                table {{ border-collapse: collapse; width: 100%; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; }}
                th {{ background-color: #f2f2f2; }}
            </style>
        </head>
        <body>
            <h2>Rs. {amount} Received!</h2>
            <p><strong>Transaction ID:</strong> {transactionId}</p>
            <p><strong>Customer Email:</strong> {customerEmail}</p>

            <h3>Property Details</h3>
            <table>
                <tr><th>Property ID</th><td>{property.Id}</td></tr>
                <tr><th>Title</th><td>{property.Title}</td></tr>
                <tr><th>Location</th><td>{property.Address}</td></tr>
            </table>

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
