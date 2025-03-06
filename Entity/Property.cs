using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Property
{
  public int Id { get; set; }

  public string? PropertyFor { get; set; }

  public bool? IsSociety { get; set; }

  public string? Status { get; set; }

  public bool? IsActive { get; set; }

  public string? Images { get; set; }

  public DateTime? UpdatedOn { get; set; }

  public DateTime? CreatedOn { get; set; }

  public decimal? Price { get; set; }

  public int? Length { get; set; }

  public int? Breadth { get; set; }

  public int? StateId { get; set; }

  public int? CityId { get; set; }

  public string? Pincode { get; set; }

  public string? Locality { get; set; }

  public string? SocietyName { get; set; }

  public string? FlatNo { get; set; }

  public string? Description { get; set; }

  public string? Address { get; set; }

  public string? Email { get; set; }

  public string? PhoneNo { get; set; }

  public string? Title { get; set; }

  public int? UserId { get; set; }

  public string? Slug { get; set; }

  public int? TypeId { get; set; }

  public string? ImgPath { get; set; }

  public bool? CornerPlot { get; set; }

  public int? BuilderId { get; set; }

  public int? Version { get; set; }

  public virtual Builder? Builder { get; set; }

  public virtual City? City { get; set; }

  public virtual State? State { get; set; }

  public virtual User? User { get; set; }

  public virtual PropertyOriginal? Type { get; set; }
}
