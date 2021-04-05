using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineApi.Models
{
    public class Flight
    {
        [Key]
        public int Id { get; set; }

        public string FlyingFrom { get; set; }
        public string FlyingTo { get; set; }
        public DateTime DateDepart { get; set; }
        public DateTime DateArrival { get; set; }

        public int FlightDistance { get; set; }


        public int VacantSeats { get; set; }
        public int BusySeats { get; set; }
        public int TicketPrice { get; set; }

        public string FirstStop { get; set; }
        public string SecondStop { get; set; }
        public string ThirdStop { get; set; }

        public bool IsOver { get; set; }
        public bool CancellingIsOver { get; set; }
        public ICollection<ReservedSeat> ReservedSeats { get; set; }

        public ICollection<FlightMark> Marks { get; set; }


        public int AirlineId { get; set; }



    }
}
