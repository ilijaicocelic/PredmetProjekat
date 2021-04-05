using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarServiceApi.Models
{
    public class FastReservationCarModel
    {
        public int Id { get; set; }
        public DateTime FirstDate { get; set; }
        public DateTime SecondDate { get; set; }
        public int Discount { get; set; }

    }
}
