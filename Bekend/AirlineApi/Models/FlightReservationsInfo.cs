using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class FlightReservationsInfo
    {
        public Flight flight { get; set; }
        public int numberOfSeats { get; set; }
        public int Mark { get; set; }
        public StatusFriendRequest status { get; set; }
    }
}
