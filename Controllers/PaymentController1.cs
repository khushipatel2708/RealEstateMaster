using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System;
using System.Collections.Generic;

[Route("api/payments")]
[ApiController]
public class PaymentsController : ControllerBase
{
  private readonly string _key = "YOUR_RAZORPAY_KEY";
  private readonly string _secret = "YOUR_RAZORPAY_SECRET";

  [HttpPost("create-order")]
  public IActionResult CreateOrder([FromBody] OrderRequest request)
  {
    try
    {
      RazorpayClient client = new RazorpayClient(_key, _secret);

      Dictionary<string, object> options = new Dictionary<string, object>
            {
                { "amount", request.Amount * 100 }, // Amount in paisa (₹1 = 100 paisa)
                { "currency", "INR" },
                { "receipt", Guid.NewGuid().ToString() },
                { "payment_capture", 1 }
            };

      Order order = client.Order.Create(options);

      return Ok(new { orderId = order["id"].ToString() });
    }
    catch (Exception ex)
    {
      return BadRequest(new { message = ex.Message });
    }
  }
}

public class OrderRequest
{
  public int Amount { get; set; } // Amount in INR
}
