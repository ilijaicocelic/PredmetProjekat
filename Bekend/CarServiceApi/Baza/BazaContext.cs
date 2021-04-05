using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarServiceApi.Models;

namespace CarServiceApi.Baza
{
    public class BazaContext : DbContext
    {
        public BazaContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
       

        public DbSet<RentCarCompany> RentCarCompanies { get; set; }

        
        public DbSet<Car> Cars { get; set; }
       

        public DbSet<CarReservation> CarReservations { get; set; }


        public DbSet<CarMark> CarMarks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            base.OnModelCreating(modelbuilder);
            modelbuilder.Entity<CarReservation>().Property(b => b.Discount).HasDefaultValue(0);
        }


    }
}
