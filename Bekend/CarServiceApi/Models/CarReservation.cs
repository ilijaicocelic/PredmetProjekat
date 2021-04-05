using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class CarReservation
    {
        [Key]
        public int Id { get; set; }

        public DateTime PickupDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public int TotalPrice { get; set; }

        public int NumberOfDays { get; set; }

        public string Brand { get; set; }
        public string Model { get; set; }
        public string Location { get; set; }

        public string UserId { get; set; }

        public int CarId { get; set; }

        public int Mark { get; set; }

        public bool IsOver { get; set; }

        public bool CancellingIsOver { get; set; }

        public bool IsFastRes { get; set; }

        public int Discount { get; set; }

    }
}
