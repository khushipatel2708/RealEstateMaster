using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RealEstate.Entity;

public partial class RealEstateContext : DbContext
{
  public RealEstateContext()
  {
  }

  public RealEstateContext(DbContextOptions<RealEstateContext> options)
      : base(options)
  {
  }

  public virtual DbSet<Builder> Builders { get; set; }

  public virtual DbSet<City> Cities { get; set; }

  public virtual DbSet<Menu> Menus { get; set; }

  public virtual DbSet<Permission> Permissions { get; set; }

  public virtual DbSet<Property> Properties { get; set; }

  public virtual DbSet<PropertyOriginal> PropertyOriginals { get; set; }

  public virtual DbSet<Role> Roles { get; set; }

  public virtual DbSet<State> States { get; set; }

  public virtual DbSet<User> Users { get; set; }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
      => optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=RealEstate;Trusted_Connection=True;TrustServerCertificate=True;");

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Builder>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Builder__3213E83F5032B302");

      entity.ToTable("Builder");

      entity.HasIndex(e => e.Email, "UQ__Builder__AB6E61646E1D0678").IsUnique();

      entity.Property(e => e.Id)
          .HasMaxLength(24)
          .IsUnicode(false)
          .HasColumnName("id");
      entity.Property(e => e.City)
          .HasMaxLength(24)
          .IsUnicode(false)
          .HasColumnName("city");
      entity.Property(e => e.Email)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("email");
      entity.Property(e => e.Fname)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("fname");
      entity.Property(e => e.Lname)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("lname");
      entity.Property(e => e.Location)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("location");
      entity.Property(e => e.Password)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("password");
      entity.Property(e => e.PhoneNo)
          .HasMaxLength(20)
          .IsUnicode(false)
          .HasColumnName("phoneNo");
      entity.Property(e => e.Pincode).HasColumnName("pincode");
      entity.Property(e => e.State)
          .HasMaxLength(24)
          .IsUnicode(false)
          .HasColumnName("state");
      entity.Property(e => e.Version).HasColumnName("version");
    });

    modelBuilder.Entity<City>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__City__3213E83FFB493B12");

      entity.ToTable("City");

      entity.Property(e => e.Id)
          .HasMaxLength(24)
          .IsUnicode(false)
          .HasColumnName("id");
      entity.Property(e => e.CreatedOn)
          .HasColumnType("datetime")
          .HasColumnName("created_on");
      entity.Property(e => e.IsActive).HasColumnName("is_active");
      entity.Property(e => e.Name)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("name");
      entity.Property(e => e.StateId)
          .HasMaxLength(24)
          .IsUnicode(false)
          .HasColumnName("state_id");
    });

    modelBuilder.Entity<Menu>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Menu__3213E83FDCAF1EF7");

      entity.ToTable("Menu");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.Icon)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("icon");
      entity.Property(e => e.Name)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("name");
      entity.Property(e => e.Path)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("path");
      entity.Property(e => e.Title)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("title");
      entity.Property(e => e.Version).HasColumnName("version");
    });

    modelBuilder.Entity<Permission>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Permissi__3213E83F769330DD");

      entity.ToTable("Permission");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.MenuId).HasColumnName("menuId");
      entity.Property(e => e.RoleId).HasColumnName("roleId");
      entity.Property(e => e.Version).HasColumnName("version");

      entity.HasOne(d => d.Menu).WithMany(p => p.Permissions)
          .HasForeignKey(d => d.MenuId)
          .HasConstraintName("FK__Permissio__menuI__66603565");

      entity.HasOne(d => d.Role).WithMany(p => p.Permissions)
          .HasForeignKey(d => d.RoleId)
          .HasConstraintName("FK__Permissio__roleI__6754599E");
    });

    modelBuilder.Entity<Property>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Property__3213E83FEF728009");

      entity.ToTable("Property");

      entity.Property(e => e.Id)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("id");
      entity.Property(e => e.Address)
          .HasColumnType("text")
          .HasColumnName("address");
      entity.Property(e => e.Breadth).HasColumnName("breadth");
      entity.Property(e => e.BuilderId)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("builderId");
      entity.Property(e => e.CityId)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("cityId");
      entity.Property(e => e.CornerPlot).HasColumnName("cornerPlot");
      entity.Property(e => e.CreatedOn)
          .HasColumnType("datetime")
          .HasColumnName("createdOn");
      entity.Property(e => e.Description)
          .HasColumnType("text")
          .HasColumnName("description");
      entity.Property(e => e.Email)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("email");
      entity.Property(e => e.FlatNo)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("flatNo");
      entity.Property(e => e.Images)
          .HasColumnType("text")
          .HasColumnName("images");
      entity.Property(e => e.ImgPath)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("imgPath");
      entity.Property(e => e.IsActive).HasColumnName("isActive");
      entity.Property(e => e.IsSociety).HasColumnName("isSociety");
      entity.Property(e => e.Length).HasColumnName("length");
      entity.Property(e => e.Locality)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("locality");
      entity.Property(e => e.PhoneNo)
          .HasMaxLength(20)
          .IsUnicode(false)
          .HasColumnName("phoneNo");
      entity.Property(e => e.Pincode)
          .HasMaxLength(10)
          .IsUnicode(false)
          .HasColumnName("pincode");
      entity.Property(e => e.Price)
          .HasColumnType("decimal(10, 2)")
          .HasColumnName("price");
      entity.Property(e => e.PropertyFor)
          .HasMaxLength(20)
          .IsUnicode(false)
          .HasColumnName("propertyFor");
      entity.Property(e => e.Slug)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("slug");
      entity.Property(e => e.SocietyName)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("societyName");
      entity.Property(e => e.StateId)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("stateId");
      entity.Property(e => e.Status)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("status");
      entity.Property(e => e.Title)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("title");
      entity.Property(e => e.TypeId)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("typeId");
      entity.Property(e => e.UpdatedOn)
          .HasColumnType("datetime")
          .HasColumnName("updatedOn");
      entity.Property(e => e.UserId)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("userId");
      entity.Property(e => e.Version).HasColumnName("version");
    });

    modelBuilder.Entity<PropertyOriginal>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Property__3213E83F394B1445");

      entity.ToTable("PropertyOriginal");

      entity.Property(e => e.Id)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("id");
      entity.Property(e => e.IsActive).HasColumnName("is_active");
      entity.Property(e => e.Title)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("title");
      entity.Property(e => e.Type)
          .HasMaxLength(100)
          .IsUnicode(false)
          .HasColumnName("type");
    });

    modelBuilder.Entity<Role>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83F15640FF9");

      entity.Property(e => e.Id)
          .ValueGeneratedNever()
          .HasColumnName("id");
      entity.Property(e => e.Name)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasColumnName("name");
      entity.Property(e => e.Version)
          .HasDefaultValue(0)
          .HasColumnName("version");
    });

    modelBuilder.Entity<State>(entity =>
    {
      entity.HasKey(e => e.Id).HasName("PK__state__3213E83F6582B67A");

      entity.ToTable("state");

      entity.Property(e => e.Id)
          .ValueGeneratedNever()
          .HasColumnName("id");
      entity.Property(e => e.CreatedOn)
          .HasDefaultValueSql("(NULL)")
          .HasColumnType("datetime")
          .HasColumnName("created_on");
      entity.Property(e => e.IsActive)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("is_active");
      entity.Property(e => e.Name)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("name");
    });

    modelBuilder.Entity<User>(entity =>
    {
      entity.ToTable("users");

      entity.Property(e => e.Id).HasColumnName("id");
      entity.Property(e => e.CityId)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("city_id");
      entity.Property(e => e.CreatedOn)
          .HasDefaultValueSql("(NULL)")
          .HasColumnType("datetime")
          .HasColumnName("createdOn");
      entity.Property(e => e.Email)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("email");
      entity.Property(e => e.Fname)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("fname");
      entity.Property(e => e.IsAdmin)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("isAdmin");
      entity.Property(e => e.Lname)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("lname");
      entity.Property(e => e.Password)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("password");
      entity.Property(e => e.PhoneNo)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("phoneNo");
      entity.Property(e => e.Pincode)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("pincode");
      entity.Property(e => e.Role)
          .HasMaxLength(50)
          .IsUnicode(false)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("role");
      entity.Property(e => e.StateId)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("state_id");
      entity.Property(e => e.Status)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("status");
      entity.Property(e => e.UpdatedOn)
          .HasDefaultValueSql("(NULL)")
          .HasColumnType("datetime")
          .HasColumnName("updatedOn");
      entity.Property(e => e.UserName)
          .HasMaxLength(255)
          .IsUnicode(false)
          .HasColumnName("userName");
      entity.Property(e => e.UserType)
          .HasDefaultValueSql("(NULL)")
          .HasColumnName("userType");
    });

    OnModelCreatingPartial(modelBuilder);
  }

  partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
