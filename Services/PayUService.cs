namespace RealEstate.Services;
using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

public class PayUService
{
  private readonly HttpClient _httpClient;
  private readonly IConfiguration _configuration;

  public PayUService(HttpClient httpClient, IConfiguration configuration)
  {
    _httpClient = httpClient;
    _configuration = configuration;
  }

  public async Task<string> GetAccessTokenAsync()
  {
    var clientId = _configuration["PayU:ClientId"];
    var clientSecret = _configuration["PayU:ClientSecret"];
    var authUrl = _configuration["PayU:AuthURL"];

    var content = new StringContent($"grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret}",
                                    Encoding.UTF8, "application/x-www-form-urlencoded");

    var response = await _httpClient.PostAsync(authUrl, content);

    if (!response.IsSuccessStatusCode)
    {
      throw new Exception($"Failed to get access token: {response.StatusCode}");
    }

    var responseString = await response.Content.ReadAsStringAsync();
    var tokenResponse = JsonConvert.DeserializeObject<PayUAuthResponse>(responseString);

    return tokenResponse.AccessToken;
  }

  public string GenerateHash(string txnId, string amount, string productInfo, string firstName, string email)
  {
    var merchantKey = _configuration["PayU:MerchantKey"];
    var salt = _configuration["PayU:Salt"];

    var hashString = $"{merchantKey}|{txnId}|{amount}|{productInfo}|{firstName}|{email}|||||||||||{salt}";
    using var sha512 = SHA512.Create();
    var hashBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(hashString));
    return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
  }
}

public class PayUAuthResponse
{
  [JsonProperty("access_token")]
  public string AccessToken { get; set; }

  [JsonProperty("expires_in")]
  public int ExpiresIn { get; set; }
}

