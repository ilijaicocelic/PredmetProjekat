using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class Car
    {
        [Key]

        public int Id { get; set; }
        public string Location { get; set; }
        public int PricePerDay { get; set; }
        public int NumberOfSeats { get; set; }
        public int BabySeats { get; set; }
        public string  Brand { get; set; }
        public int Year { get; set; }
        public string Model { get; set; }

        public ICollection<CarReservation> CarReservations { get; set; }

        public ICollection<CarMark> Marks { get; set; }

        
        public int RentCarCompanyId { get; set; }


    }
}
