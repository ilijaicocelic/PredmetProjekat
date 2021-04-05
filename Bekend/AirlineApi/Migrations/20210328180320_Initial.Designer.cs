﻿// <auto-generated />
using System;
using AirlineApi.Baza;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AirlineApi.Migrations
{
    [DbContext(typeof(BazaContext))]
    [Migration("20210328180320_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("AirlineApi.Models.Airline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Adress");

                    b.Property<string>("CompanyName");

                    b.Property<string>("Description");

                    b.Property<int>("Mark");

                    b.HasKey("Id");

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("AirlineApi.Models.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AirlineId");

                    b.Property<int>("BusySeats");

                    b.Property<bool>("CancellingIsOver");

                    b.Property<DateTime>("DateArrival");

                    b.Property<DateTime>("DateDepart");

                    b.Property<string>("FirstStop");

                    b.Property<int>("FlightDistance");

                    b.Property<string>("FlyingFrom");

                    b.Property<string>("FlyingTo");

                    b.Property<bool>("IsOver");

                    b.Property<string>("SecondStop");

                    b.Property<string>("ThirdStop");

                    b.Property<int>("TicketPrice");

                    b.Property<int>("VacantSeats");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("AirlineApi.Models.FlightMark", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FlightId");

                    b.Property<string>("UserId");

                    b.Property<int>("mark");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("FlightMarks");
                });

            modelBuilder.Entity("AirlineApi.Models.FriendRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Status");

                    b.Property<string>("UserId");

                    b.Property<string>("UserId2");

                    b.HasKey("Id");

                    b.ToTable("FriendRequests");
                });

            modelBuilder.Entity("AirlineApi.Models.ReservedSeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("FlightId");

                    b.Property<string>("NameOfUser");

                    b.Property<string>("SeatName");

                    b.Property<string>("SurnameOfUser");

                    b.Property<string>("UserId");

                    b.Property<int>("passportNumberOfUser");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("ReservedSeats");
                });

            modelBuilder.Entity("AirlineApi.Models.SeatReservationRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ReservedSeatId");

                    b.Property<int>("Status");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ReservedSeatId");

                    b.ToTable("SeatReservationRequests");
                });

            modelBuilder.Entity("AirlineApi.Models.Flight", b =>
                {
                    b.HasOne("AirlineApi.Models.Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlineApi.Models.FlightMark", b =>
                {
                    b.HasOne("AirlineApi.Models.Flight")
                        .WithMany("Marks")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlineApi.Models.ReservedSeat", b =>
                {
                    b.HasOne("AirlineApi.Models.Flight")
                        .WithMany("ReservedSeats")
                        .HasForeignKey("FlightId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AirlineApi.Models.SeatReservationRequest", b =>
                {
                    b.HasOne("AirlineApi.Models.ReservedSeat", "ReservedSeat")
                        .WithMany()
                        .HasForeignKey("ReservedSeatId");
                });
#pragma warning restore 612, 618
        }
    }
}