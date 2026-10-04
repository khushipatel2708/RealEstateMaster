using Microsoft.AspNetCore.SignalR;
using RealEstate.Hubs;

namespace RealEstate.Services
{
  public class SmsService
  {
    private readonly IHubContext<NotificationHub> _notificationHub;

    public SmsService(IHubContext<NotificationHub> notificationHub)
    {
      _notificationHub = notificationHub;
    }

    public async Task SendSmsAsync(string phoneNumber, string message)
    {
      try
      {
        // ✅ Simulating SMS sending (Replace with an actual SMS API like Twilio)
        Console.WriteLine($"Sending SMS to {phoneNumber}: {message}");

        // Simulating delay (remove in production)
        await Task.Delay(500);

        // ✅ Send notification to the admin panel via SignalR
        await _notificationHub.Clients.All.SendAsync("ReceiveNotification", message);

        Console.WriteLine("SMS sent and notification pushed!");
      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error sending SMS: {ex.Message}");
      }
    }
  }
}

