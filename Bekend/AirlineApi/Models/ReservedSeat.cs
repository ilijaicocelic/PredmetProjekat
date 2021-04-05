using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class ReservedSeat
    {

        [Key]
        public int Id { get; set; }

        public string SeatName { get; set; }
        public string NameOfUser { get; set; }
        public string SurnameOfUser { get; set; }
        public int passportNumberOfUser { get; set; }

        public string UserId { get; set; }
        public int FlightId { get; set; }
    }
}
