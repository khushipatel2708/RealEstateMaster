//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Security.Cryptography;
//using System.Text;
//using System.Net.Http;
//using System.Threading.Tasks;

//[Route("api/payments")]
//[ApiController]
//public class PaymentsController : ControllerBase
//{
//  private readonly IConfiguration _configuration;
//  private readonly string _merchantKey;
//  private readonly string _merchantSalt;
//  private readonly HttpClient _httpClient;

//  public PaymentsController(IConfiguration configuration)
//  {
//    _configuration = configuration;
//    _merchantKey = _configuration["PayU:MerchantKey"]; // Load from appsettings.json
//    _merchantSalt = _configuration["PayU:MerchantSalt"];
//    _httpClient = new HttpClient();
//  }

//  // ✅ Generate Hash for PayU Payment Request
//  [HttpPost("generate-hash")]
//  public IActionResult GenerateHash([FromBody] PaymentRequest model)
//  {
//    if (model == null)
//    {
//      return BadRequest("Invalid payment data");
//    }

//    try
//    {
//      //string hashSequence = $"{_merchantKey}|{model.txnid}|{model.amount}|{model.productinfo}|{model.firstname}|{model.email}|||||||||||{_merchantSalt}";
//      string hashSequence = $"{_merchantKey}|{model.txnid}|{model.amount}|{model.productinfo}|{model.firstname}|{model.email}|{model.udf1 ?? ""}|{model.udf2 ?? ""}|{model.udf3 ?? ""}|{model.udf4 ?? ""}|{model.udf5 ?? ""}|{model.udf6 ?? ""}|{model.udf7 ?? ""}|{model.udf8 ?? ""}|{model.udf9 ?? ""}|{model.udf10 ?? ""}|{_merchantSalt}";

//      string hash = GetSHA512Hash(hashSequence);

//      return Ok(new { hash });
//    }
//    catch (Exception ex)
//    {
//      return StatusCode(500, new { error = ex.Message });
//    }
//  }

//  // ✅ Helper method to generate SHA-512 hash
//  private string GetSHA512Hash(string input)
//  {
//    using (SHA512 sha512 = SHA512.Create())
//    {
//      byte[] bytes = Encoding.UTF8.GetBytes(input);
//      byte[] hashBytes = sha512.ComputeHash(bytes);
//      return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
//    }
//  }
//  [HttpPost("initiate-payment")]
//public async Task<IActionResult> InitiatePayment([FromBody] PaymentRequest model)
//{
//    if (model == null)
//    {
//        return BadRequest("Invalid payment data");
//    }

//    try
//    {
//      string amountString = model.amount.ToString("0.00");
//      //string hashSequence = $"{_merchantKey}|{model.txnid}|{model.amount}|{model.productinfo}|{model.firstname}|{model.email}|||||||||||{_merchantSalt}";
//      string hashSequence = $"{_merchantKey}|{model.txnid}|{amountString}|{model.productinfo}|{model.firstname}|{model.email}|{model.udf1 ?? ""}|{model.udf2 ?? ""}|{model.udf3 ?? ""}|{model.udf4 ?? ""}|{model.udf5 ?? ""}|{model.udf6 ?? ""}|{model.udf7 ?? ""}|{model.udf8 ?? ""}|{model.udf9 ?? ""}|{model.udf10 ?? ""}|{_merchantSalt}";

//      string hash = GetSHA512Hash(hashSequence);

//        var postData = new Dictionary<string, string>
//        {
//            { "key", _merchantKey },
//            { "txnid", model.txnid },
//            { "amount", amountString },
//            { "productinfo", model.productinfo },
//            { "firstname", model.firstname },
//            { "email", model.email },
//            { "phone", model.phone },
//            { "surl", model.surl },
//            { "furl", model.furl },
//            { "hash", hash },
//            { "service_provider", "payu_paisa" }
//        };

//      var content = new FormUrlEncodedContent(postData);
//      var response = await _httpClient.PostAsync("https://test.payu.in/_payment", content);
//      var responseBody = await response.Content.ReadAsStringAsync();

//      // ✅ Log the response from PayU
//      Console.WriteLine("Response Status Code: " + response.StatusCode);
//      Console.WriteLine("Response Body: " + responseBody);

//      return Ok(new { success = true, postData, response = responseBody, paymentUrl = "https://test.payu.in/_payment" });
//    }
//    catch (Exception ex)
//    {
//        return StatusCode(500, new { error = ex.Message });
//    }
//}

//  // ✅ Verify PayU Payment (Changed GET to POST)
//  [HttpPost("verify-payment")]
//  public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentRequest model)
//  {
//    if (model == null || string.IsNullOrEmpty(model.txnid))
//    {
//      return BadRequest("Invalid transaction ID");
//    }

//    try
//    {
//      var postData = new Dictionary<string, string>
//            {
//                { "key", "1YRwjC" },
//                { "command", "verify_payment" },
//                { "var1", model.txnid },
//                { "hash", GetSHA512Hash($"{_merchantKey}|verify_payment|{model.txnid}|{_merchantSalt}") } // Generate Hash for verification
//            };

//      var content = new FormUrlEncodedContent(postData);
//      var response = await _httpClient.PostAsync("https://info.payu.in/merchant/postservice.php?form=2", content);
//      var result = await response.Content.ReadAsStringAsync();

//      return Ok(result);
//    }
//    catch (Exception ex)
//    {
//      return StatusCode(500, new { error = ex.Message });
//    }
//  }
//}

//// ✅ Payment Request Model
//public class PaymentRequest
//{
//  public string txnid { get; set; } // Transaction ID (Unique for each payment)
//  public decimal amount { get; set; } // Payment Amount
//  public string productinfo { get; set; } // Product/Service Name
//  public string firstname { get; set; } // Customer Name
//  public string email { get; set; } // Customer Email
//  public string phone { get; set; } // Customer Phone Number
//  public string surl { get; set; } // Success URL
//  public string furl { get; set; } // Failure URL

//  public string udf1 { get; set; }
//  public string udf2 { get; set; }
//  public string udf3 { get; set; }
//  public string udf4 { get; set; }
//  public string udf5 { get; set; }
//  public string udf6 { get; set; }
//  public string udf7 { get; set; }
//  public string udf8 { get; set; }
//  public string udf9 { get; set; }
//  public string udf10 { get; set; }
//}

//// ✅ Payment Verification Request Model
//public class VerifyPaymentRequest
//{
//  public string txnid { get; set; }
//}
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

[Route("api/payments")]
[ApiController]
public class PaymentsController : ControllerBase
{
  private readonly IConfiguration _configuration;
  private readonly string _merchantKey;
  private readonly string _merchantSalt;
  private readonly HttpClient _httpClient;

  public PaymentsController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
  {
    _configuration = configuration;
    _merchantKey = _configuration["PayU:MerchantKey"];
    _merchantSalt = _configuration["PayU:MerchantSalt"];
    _httpClient = httpClientFactory.CreateClient();
  }

  // ✅ Generate Hash for PayU Payment Request
  [HttpPost("generate-hash")]
  public IActionResult GenerateHash([FromBody] PaymentRequest model)
  {
    if (model == null)
    {
      return BadRequest("Invalid payment data");
    }

    try
    {
      string amountString = model.amount.ToString("0.00"); // Ensure 2 decimal places
      Console.WriteLine(amountString,"amountString");
      string hashSequence = $"{_merchantKey}|{model.txnid}|{amountString}|{model.productinfo}|{model.firstname}|{model.email}|{model.udf1 ?? ""}|{model.udf2 ?? ""}|{model.udf3 ?? ""}|{model.udf4 ?? ""}|{model.udf5 ?? ""}||||||{_merchantSalt}";

      string hash = ComputeSHA512Hash(hashSequence);

      // Debugging: Print hash sequence & hash
      Console.WriteLine("Hash Sequence: " + hashSequence);
      Console.WriteLine("Generated Hash: " + hash);

      return Ok(new { hash });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = ex.Message });
    }
  }


  // ✅ Helper method to generate SHA-512 hash
  static string ComputeSHA512Hash(string input)
  {
    using (SHA512 sha512 = SHA512.Create())
    {
      byte[] bytes = Encoding.UTF8.GetBytes(input);
      byte[] hashBytes = sha512.ComputeHash(bytes);
      return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();  // Convert to lowercase
    }
  }

  // ✅ Initiate PayU Payment
  [HttpPost("initiate-payment")]
  public async Task<IActionResult> InitiatePayment([FromBody] PaymentRequest model)
  {
    if (model == null)
    {
      return BadRequest("Invalid payment data");
    }

    try
    {
      string amountString = model.amount.ToString("0.00");
      //string hashSequence = $"{_merchantKey}|{model.txnid}|{amountString}|{model.productinfo}|{model.firstname}|{model.email}|{model.udf1 ?? ""}|{model.udf2 ?? ""}|{model.udf3 ?? ""}|{model.udf4 ?? ""}|{model.udf5 ?? ""}|{_merchantSalt}";
      string hashSequence = $"{_merchantKey}|{model.txnid}|{model.amount}|{model.productinfo}|{model.firstname}|{model.email}|{model.udf1 ?? ""}|{model.udf2 ?? ""}|{model.udf3 ?? ""}|{model.udf4 ?? ""}|{model.udf5 ?? ""}||||||{_merchantSalt}";
      string hash = ComputeSHA512Hash(hashSequence);

      var postData = new Dictionary<string, string>
            {
                { "key", _merchantKey },
                { "txnid",model.txnid},
                { "amount", amountString },
                { "productinfo", model.productinfo },
                { "firstname", model.firstname },
                { "email", model.email },
                { "phone", model.phone },
                { "surl", model.surl },
                { "furl", model.furl },
                { "hash", hash },
                { "service_provider", "payu_paisa" }
            };

      var content = new FormUrlEncodedContent(postData);
      var response = await _httpClient.PostAsync("https://test.payu.in/_payment", content);
      var responseBody = await response.Content.ReadAsStringAsync();

      Console.WriteLine("Response Status Code: " + response.StatusCode);
      Console.WriteLine("Response Body: " + responseBody);

      return Ok(new
      {
        success = true,
        postData,
        response = responseBody,
        paymentUrl = "https://test.payu.in/_payment"
      });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = ex.Message });
    }
  }

  [HttpPost("success")]
  public IActionResult PaymentSuccess([FromForm] PaymentResponseModel response)
  {
    // Check if the transaction was successful
    if (response.Status == "success")
    {
      // Update property status to "Sold" in the database (implement your logic)
      // Example: _propertyService.UpdateStatus(response.PropertyId, "Sold");

      // Redirect to the Angular property page with propertyId
      return Redirect($"http://localhost:4200/property-details/{response.PropertyId}");
    }
    else
    {
      return Redirect("http://localhost:4200/payment-failed");
    }
  }

  // ✅ Verify PayU Payment
  [HttpPost("verify-payment")]
  public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentRequest model)
  {
    if (model == null || string.IsNullOrEmpty(model.txnid))
    {
      return BadRequest("Invalid transaction ID");
    }

    try
    {
      string hashSequence = $"{_merchantKey}|verify_payment|{model.txnid}|{_merchantSalt}";
      string hash = ComputeSHA512Hash(hashSequence);

      var postData = new Dictionary<string, string>
            {
                { "key", _merchantKey },
                { "command", "verify_payment" },
                { "var1", model.txnid },
                { "hash", hash }
            };

      var content = new FormUrlEncodedContent(postData);
      var response = await _httpClient.PostAsync("https://info.payu.in/merchant/postservice.php?form=2", content);
      var result = await response.Content.ReadAsStringAsync();

      return Ok(new { success = true, verificationResponse = result });
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = ex.Message });
    }
  }
}

// ✅ Payment Request Model
public class PaymentRequest
{
  public string txnid { get; set; } // Transaction ID (Unique for each payment)
  public decimal amount { get; set; } // Payment Amount
  public string productinfo { get; set; } // Product/Service Name
  public string firstname { get; set; } // Customer Name
  public string email { get; set; } // Customer Email
  public string phone { get; set; } // Customer Phone Number
  public string surl { get; set; } // Success URL
  public string furl { get; set; } // Failure URL

  public string udf1 { get; set; }
  public string udf2 { get; set; }
  public string udf3 { get; set; }
  public string udf4 { get; set; }
  public string udf5 { get; set; }
 public string udf6 { get; set; }
  public string udf7 { get; set; }
  public string udf8 { get; set; }
  public string udf9 { get; set; }
  public string udf10 { get; set; }
}

// ✅ Payment Verification Request Model
public class VerifyPaymentRequest
{
  public string txnid { get; set; }
}
public class PaymentResponseModel
{
  public string Status { get; set; }
  public string PropertyId { get; set; }
}
