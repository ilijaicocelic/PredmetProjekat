using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class MakeReservationcs
    {
        public int CarId { get; set; }

        public DateTime PickupDate { get; set; }

        public DateTime ReturnDate { get; set; }

        public int TotalPrice { get; set; }

        public int NumberOfDays { get; set; }
    }
}
