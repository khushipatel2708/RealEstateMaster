using System.ComponentModel.DataAnnotations;

namespace RealEstate.Entity
{
  public class Payment
  {
    [Key]
    public int Id { get; set; }

    public string TransactionId { get; set; }  // PayU txnid

    public decimal Amount { get; set; }

    public string PlanName { get; set; }

    public string FirstName { get; set; }

    public string Email { get; set; }

    public string Status { get; set; }  // success, failed, pending

    public string PaymentGateway { get; set; } = "PayU";

    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;

    public string HashString { get; set; }
  }
}
