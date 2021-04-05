using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class SeatReservationRequest
    {
        [Key]
        public int Id { get; set; }

        public string UserId { get; set; }
        public ReservedSeat ReservedSeat { get; set; }
        public StatusFriendRequest Status { get; set; }
    }
}
