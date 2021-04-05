using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlineApi.Models;

namespace AirlineApi.Baza
{
    public class BazaContext : DbContext
    {
        public BazaContext(DbContextOptions options) : base(options)
        {
        }
     
        public DbSet<FriendRequest> FriendRequests { get; set; }

        

        public DbSet<Airline> Airlines { get; set; }
        
        public DbSet<Flight> Flights { get; set; }

       

        public DbSet<ReservedSeat> ReservedSeats { get; set; }
        public DbSet<SeatReservationRequest> SeatReservationRequests { get; set; }

        public DbSet<FlightMark> FlightMarks { get; set; }

     

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
          
        }


    }
}
