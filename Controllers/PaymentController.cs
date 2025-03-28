using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using System;
using Razorpay.Api;
using RealEstate.Entity;
using Microsoft.EntityFrameworkCore;
namespace RealEstate.Controllers
{

  [Route("api/payments1")]
  [ApiController]
  public class PaymentController:ControllerBase
  {
    private readonly IConfiguration _config;
    private readonly RealEstateContext _db;
    private readonly EmailService _emailService;
    public PaymentController(IConfiguration config,RealEstateContext db, EmailService emailService)
    {
      _config = config;
      _db = db;
      _emailService = emailService;
    }

    [HttpGet("payu-payment")]
    public IActionResult GetPayUDetails(string amount,string firstName,string planName)
    {
      var txnId = Guid.NewGuid().ToString();
      var email = "test@example.com";
      var serviceProvider = "test";
      decimal parsedAmount = decimal.TryParse(amount, out decimal amt) ? amt : 0;
      //var sanitizedFirstName = Uri.UnescapeDataString(firstName?.Trim() ?? "");
      var sanitizedPlanName = Uri.UnescapeDataString(planName?.Trim() ?? "");
      var payuMerchantKey = _config["PayU:MerchantKey"];
      var payuMerchantSaltV1 = _config["PayU:MerchantSalt"];
      var payuUrl = "https://test.payu.in/_payment";
      var baseUrl = "http://localhost:4200";
      var udf1 = firstName; // Ensure propertySlug is passed properly
      var udf2 = ""; // Keep empty if not used
      var udf3 = "";
      var udf4 = "";
      var udf5 = "";
      var hashString = $"{payuMerchantKey}|{txnId}|{parsedAmount}|{sanitizedPlanName}|{firstName}|{email}|{udf1}|{udf2}|{udf3}|{udf4}|{udf5}||||||{payuMerchantSaltV1}";
      var payuShaToken = GenerateSHA512Hash(hashString);

      var paymentDetails = new
      {
        txnId,
        plan_name = sanitizedPlanName,
        first_name = firstName,
        email,
        service_provider = serviceProvider,
        amount,
        call_back_url = $"http://localhost:5026/api/payments1/success",
        payu_fail_url = $"{baseUrl}/api/payments1/failed",
        payu_cancel_url = $"{baseUrl}/api/payments1/cancel",
        payu_merchant_key = payuMerchantKey,
        payu_sha_token = payuShaToken,
        payu_url = payuUrl
      };

      return Ok(new { success = true, code = 200, info = paymentDetails });
    }

    [HttpPost("failed")]
    public IActionResult PaymentFailed()
    {
      return Redirect("http://localhost:4200");
    }

    [HttpPost("cancel")]
    public IActionResult PaymentCancelled()
    {
      return Redirect("http://localhost:4200");
    }

    [HttpPost("success")]
    public async Task<IActionResult> PaymentSuccess([FromForm] IFormCollection formData, [FromServices] RealEstateContext dbContext)
      {
      var status = formData["status"];
      var txnId = formData["txnid"];
      var amount = Convert.ToDecimal(formData["amount"]);
      var planName = formData["productinfo"];
      var firstName = formData["firstName"].ToString(); 
      var email = formData["email"];
      var hashString = formData["hash"];
      var udf1 = formData["udf1"].ToString();
      var PropertyId = _db.Properties.Where(w => w.Slug == udf1).Select(s => s.Id).FirstOrDefault();
      var payment = new Entity.Payment
      {
        TransactionId = txnId,
        Amount = amount,
        PlanName = planName,
        FirstName = firstName,
        Email = email,
        Status = status,
        HashString = hashString,
      };

      // Save to database
      await dbContext.Payments.AddAsync(payment);
      if (status == "success" && !string.IsNullOrEmpty(planName))
      {
        var property = await dbContext.Properties.FirstOrDefaultAsync(p => p.Slug == udf1);
        if (property != null)
        {
          property.Status = "sold";
        }
        await _emailService.SendPaymentSuccessEmail(email, txnId, amount, firstName, udf1);
      }
      await dbContext.SaveChangesAsync();

      return Redirect($"http://localhost:4200/payment-success?status={status}&txnid={txnId}&amount={amount}&propertyId={PropertyId}&title={udf1}");
    }

    private static string GenerateSHA512Hash(string input)
    {
      using (SHA512 sha512 = SHA512.Create())
      {
        byte[] bytes = Encoding.UTF8.GetBytes(input);
        byte[] hashBytes = sha512.ComputeHash(bytes);
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
      }
    }
  }

}

public class PayUResponseDto
{
  public string Status { get; set; }
  public string TxnId { get; set; }
  public string Amount { get; set; }
}
