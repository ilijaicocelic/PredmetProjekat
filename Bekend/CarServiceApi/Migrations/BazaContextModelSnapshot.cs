// <auto-generated />
using System;
using CarServiceApi.Baza;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CarServiceApi.Migrations
{
    [DbContext(typeof(BazaContext))]
    partial class BazaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CarServiceApi.Models.Car", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BabySeats");

                    b.Property<string>("Brand");

                    b.Property<string>("Location");

                    b.Property<string>("Model");

                    b.Property<int>("NumberOfSeats");

                    b.Property<int>("PricePerDay");

                    b.Property<int>("RentCarCompanyId");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("RentCarCompanyId");

                    b.ToTable("Cars");
                });

            modelBuilder.Entity("CarServiceApi.Models.CarMark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CarId");

                    b.Property<string>("UserId");

                    b.Property<int>("mark");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("UserId");

                    b.ToTable("CarMarks");
                });

            modelBuilder.Entity("CarServiceApi.Models.CarReservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Brand");

                    b.Property<bool>("CancellingIsOver");

                    b.Property<int>("CarId");

                    b.Property<int>("Discount")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue(0);

                    b.Property<bool>("IsFastRes");

                    b.Property<bool>("IsOver");

                    b.Property<string>("Location");

                    b.Property<int>("Mark");

                    b.Property<string>("Model");

                    b.Property<int>("NumberOfDays");

                    b.Property<DateTime>("PickupDate");

                    b.Property<DateTime>("ReturnDate");

                    b.Property<int>("TotalPrice");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CarId");

                    b.HasIndex("UserId");

                    b.ToTable("CarReservations");
                });

            modelBuilder.Entity("CarServiceApi.Models.RentCarCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adress");

                    b.Property<string>("CompanyName");

                    b.Property<string>("Description");

                    b.Property<int>("Mark");

                    b.HasKey("Id");

                    b.ToTable("RentCarCompanies");
                });

            modelBuilder.Entity("CarServiceApi.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("Address");

                    b.Property<int?>("CarCompanyId");

                    b.Property<string>("ConcurrencyStamp");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("Name");

                    b.Property<string>("NormalizedEmail");

                    b.Property<string>("NormalizedUserName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<int>("Role");

                    b.Property<string>("SecurityStamp");

                    b.Property<string>("Surname");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName");

                    b.Property<bool>("isConfirmed");

                    b.HasKey("Id");

                    b.HasIndex("CarCompanyId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CarServiceApi.Models.Car", b =>
                {
                    b.HasOne("CarServiceApi.Models.RentCarCompany")
                        .WithMany("Cars")
                        .HasForeignKey("RentCarCompanyId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CarServiceApi.Models.CarMark", b =>
                {
                    b.HasOne("CarServiceApi.Models.Car")
                        .WithMany("Marks")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarServiceApi.Models.User")
                        .WithMany("CarMarks")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CarServiceApi.Models.CarReservation", b =>
                {
                    b.HasOne("CarServiceApi.Models.Car")
                        .WithMany("CarReservations")
                        .HasForeignKey("CarId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CarServiceApi.Models.User")
                        .WithMany("CarReservations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CarServiceApi.Models.User", b =>
                {
                    b.HasOne("CarServiceApi.Models.RentCarCompany", "CarCompany")
                        .WithMany()
                        .HasForeignKey("CarCompanyId");
                });
#pragma warning restore 612, 618
        }
    }
}
