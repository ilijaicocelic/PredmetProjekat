using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class FlightMark
    {
        [Key]
        public int Id { get; set; }

        public int mark { get; set; }

        public string UserId { get; set; }
        public int FlightId { get; set; }
    }
}
