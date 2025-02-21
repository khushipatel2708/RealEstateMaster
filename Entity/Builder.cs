using System;
using System.Collections.Generic;

namespace RealEstate.Entity;

public partial class Builder
{
    public string Id { get; set; } = null!;

    public string? Fname { get; set; }

    public string? Lname { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public long? Pincode { get; set; }

    public string? State { get; set; }

    public string? City { get; set; }

    public string? Location { get; set; }

    public string? PhoneNo { get; set; }

    public int? Version { get; set; }
}
