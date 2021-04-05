using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using AirlineApi.Baza;
using AirlineApi.Models;

namespace AirlineApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
       // private UserManager<User> _userManager;
        private BazaContext _context;
        private readonly ApplicationSettings _appSettings;
        public FlightController(/*UserManager<User> userManager,*/ IOptions<ApplicationSettings> appSettings, BazaContext bz)
        {
           // this._userManager = userManager;
            _appSettings = appSettings.Value;
            _context = bz;
        }

      
        [HttpGet]
        [Route("GetAllAirlineCompanies")]
        public async Task<Object> GetAllAirlineCompanies()
        {
            var airlines = _context.Airlines.Include(x => x.Flights).ToList();
            return Ok(new { airlines });
        }


        //[HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Route("GetFlightForAirline")]
        //public async Task<Object> GetFlightForAirline()
        //{
        //    string userID = User.Claims.ElementAt(0).Value;
        //    //var user = _context.Users.Include(x => x.AirlineComnpany).Where(x => x.Id == userID).ToList().First();
        //    //var company = _context.Airlines.Include(x => x.Flights).ThenInclude(fli => fli.Marks).Where(x => x.Id == user.AirlineComnpany.Id).ToList().First();
        //    //var listflight = company.Flights.ToList();

        //    return Ok(new { listflight });
        //}


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("AddingFlight")]
        public async Task<IActionResult> AddingFlight(Flight flightModel)
        {
            string userRole = User.Claims.ElementAt(1).Value;

            if (userRole == "AirlineAdmin")
            {
                string userID = User.Claims.ElementAt(0).Value;
                var newflight = new Flight()
                {
                    FlyingFrom = flightModel.FlyingFrom,
                    FlyingTo = flightModel.FlyingTo,
                    FlightDistance = flightModel.FlightDistance,
                    DateDepart = flightModel.DateDepart,
                    DateArrival = flightModel.DateArrival,
                    VacantSeats = 120,
                    BusySeats = 0,

                    TicketPrice = flightModel.TicketPrice,

                    FirstStop = flightModel.FirstStop,
                    SecondStop = flightModel.SecondStop,
                    ThirdStop = flightModel.ThirdStop,
                    IsOver = false
                };

               // var user = _context.Users.Include(x => x.AirlineComnpany).Where(x => x.Id == userID).ToList().First();
              //  var company = _context.Airlines.Include(x => x.Flights).Where(x => x.Id == user.AirlineComnpany.Id).ToList().First();
                //company.Flights.Add(newflight);

               // _context.Entry(company).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Successfully Adding" });
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("DeleteFlightFromList/{id}")]
        public async Task<Object> DeleteFlightFromList(int id)
        {
            string userRole = User.Claims.ElementAt(1).Value;

            if (userRole == "AirlineAdmin")
            {
                var flight = _context.Flights.Where(x => x.Id == id).ToList().First();
                _context.Flights.Remove(flight);
                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Successfully Delleted" });
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("saveChangesOnFlight/{id}")]
        public async Task<IActionResult> SaveChangesOnFlight(Flight flightModel, int id)
        {
            string userRole = User.Claims.ElementAt(1).Value;

            if (userRole == "AirlineAdmin")
            {

                var flight = _context.Flights.Where(x => x.Id == id).ToList().First();

                flight.FlyingFrom = flightModel.FlyingFrom;
                flight.FlyingTo = flightModel.FlyingTo;
                flight.FlightDistance = flightModel.FlightDistance;
                flight.DateDepart = flightModel.DateDepart;
                flight.DateArrival = flightModel.DateArrival;

                flight.TicketPrice = flightModel.TicketPrice;

                flight.FirstStop = flightModel.FirstStop;
                flight.SecondStop = flightModel.SecondStop;
                flight.ThirdStop = flightModel.ThirdStop;

                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Successfully Changed!" });
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetCompanyInfo")]
        public async Task<Object> GetCompanyInfo()
        {
            string userID = User.Claims.ElementAt(0).Value;
           // var user = _context.Users.Include(x => x.AirlineComnpany).Where(x => x.Id == userID).ToList().First();
           // var comp = _context.Airlines.Where(x => x.Id == user.AirlineComnpany.Id).ToList().First();

            return Ok(new {/* comp */});
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("SaveChangeInfo")]
        public async Task<IActionResult> SaveChangeInfo(Airline airlinemodel)
        {
            var airline = _context.Airlines.Where(x => x.Id == airlinemodel.Id).ToList().First();

            airline.CompanyName = airlinemodel.CompanyName;
            airline.Description = airlinemodel.Description;
            airline.Adress = airlinemodel.Adress;

            _context.Entry(airline).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpGet]
        [Route("GetFlighs/{airlineID}")]
        public async Task<Object> GetFlighs(int airlineID)
        {
            var airline = _context.Airlines.Include(x => x.Flights).Where(x => x.Id == airlineID).ToList().First();
            var listflight = airline.Flights.ToList();
            return Ok(new { listflight });
        }


        [HttpGet]
        [Route("GetSearchedFlights/{flyingfrom}/{flyingTo}/{dateDepart}/{numberOfSeat}/{dateReturn}")]
        public async Task<Object> GetSearchedFlights(string flyingfrom, string flyingTo, string dateDepart, int numberOfSeat, string dateReturn)
        {
            List<Flight> Retflights = new List<Flight>();
            if (flyingfrom == "" && flyingTo == "" && dateDepart == "")
            {
                return BadRequest();
            }
            else
            {
                var DateDepart = DateTime.Parse(dateDepart);
                if (DateTime.UtcNow.Date == DateDepart.Date) //Ako izaberemo danasnji datum..pokazati samo letove koji polecu nakon trenutnog vremena
                {
                    DateDepart = DateTime.UtcNow;
                }

                var flights = _context.Flights.Where(x => x.FlyingFrom.ToUpper() == flyingfrom.ToUpper() && x.FlyingTo.ToUpper() == flyingTo.ToUpper() && x.VacantSeats >= numberOfSeat).ToList();

                foreach (Flight flight in flights)
                {
                    if (flight.DateDepart >= DateDepart && flight.DateDepart <= DateDepart.AddDays(3)) // period od 3 dana
                    {
                        Retflights.Add(flight);
                    }
                }

                DateTime DateReturn;
                if (dateReturn != "-") //ako je korisnik naveo i datum vracanja
                {
                    DateReturn = DateTime.Parse(dateReturn);
                    flights = _context.Flights.Where(x => x.FlyingFrom.ToUpper() == flyingTo.ToUpper() && x.FlyingTo.ToUpper() == flyingfrom.ToUpper() && x.VacantSeats >= numberOfSeat).ToList();

                    foreach (Flight flight in flights)
                    {
                        if (flight.DateDepart >= DateReturn && flight.DateArrival <= DateReturn.AddDays(3)) // period od 3 dana
                        {
                            Retflights.Add(flight);
                        }
                    }
                }
            }

            return Ok(new { Retflights });
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GetFlightWithId/{id}")]
        public async Task<Object> GetFlightWithId(int id)
        {
            var flight = _context.Flights.Include(x => x.ReservedSeats).Where(x => x.Id == id).ToList().First();
            return Ok(new { flight });
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("SeatReservation")]
        public async Task<Object> SeatReservation(ReservedSeat reservation)
        {
            ReservedSeat seat = new ReservedSeat();
            seat.SeatName = reservation.SeatName;
            seat.SurnameOfUser = reservation.SurnameOfUser;
            seat.NameOfUser = reservation.NameOfUser;
            seat.passportNumberOfUser = reservation.passportNumberOfUser;
        
            string userID = User.Claims.ElementAt(0).Value;
           // var user = _context.Users.Include(x => x.ReservedSeats).Where(x => x.Id == userID).ToList().First();
            var flightID = reservation.FlightId;
            var flight = _context.Flights.Include(x => x.ReservedSeats).Where(x => x.Id == flightID).ToList().First();

            if (userID == reservation.UserId) //rezervise za sebe
            {
                flight.ReservedSeats.Add(seat);
                flight.VacantSeats--;
                flight.BusySeats++;
               // user.ReservedSeats.Add(seat);
                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
               // _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                return Ok(new { result });
            }
            else //salje zahtev prijatelju
            {
                flight.ReservedSeats.Add(seat);
                flight.VacantSeats--;
                flight.BusySeats++;
             //   user.ReservedSeats.Add(seat);
                var friendID = reservation.UserId;
             //   var friend = _context.Users.Include(x => x.SeatReservationRequests).Where(x => x.Id == friendID).ToList().First();
                SeatReservationRequest seatReservationRequest = new SeatReservationRequest();
                seatReservationRequest.ReservedSeat = seat;
                seatReservationRequest.Status = StatusFriendRequest.OnWait;

                //friend.SeatReservationRequests.Add(seatReservationRequest);

                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                //_context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                //_context.Entry(friend).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                return Ok(new { result });
            }
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("CancelFlightReservation/{id}")]
        public async Task<Object> CancelFlightReservation(int id)
        {
            var flightID = id;
            var flight = _context.Flights.Include(x => x.ReservedSeats).Where(x => x.Id == flightID).ToList().First();
            if ((flight.DateDepart - DateTime.UtcNow).TotalHours < 3)
            {
                flight.IsOver = true;
                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return BadRequest(new { message = "Cant canncel reservation !" });
            }
            else
            {
                string userId = User.Claims.ElementAt(0).Value;
                var seatReservations = _context.ReservedSeats.Where(x => x.UserId == userId && x.FlightId == flightID).ToList();

                foreach (var reservedSeat in seatReservations)
                {
                    flight.VacantSeats++;
                    flight.BusySeats--;

                    var seatReservationRequests = _context.SeatReservationRequests.Include(x => x.ReservedSeat).Where(x => x.ReservedSeat.Id == reservedSeat.Id).ToList();
                    SeatReservationRequest seatReservationRequest;
                    if (seatReservationRequests.Count != 0) //ako je sediste rezervisani za nekog prijatelja ukloniti ga i iz te tabele
                    {
                        seatReservationRequest = seatReservationRequests.First();
                        _context.Entry(seatReservationRequest).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
                    }

                    _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.Entry(reservedSeat).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
                    var result = await _context.SaveChangesAsync();
                }
                return Ok();
            }
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("AcceptReservationRequests")]
        public async Task<IActionResult> AcceptReservationRequests(Flight flight)
        {
            string userId = User.Claims.ElementAt(0).Value;
            var flightID = flight.Id;
            var seatReservationRequests = _context.SeatReservationRequests.Include(x => x.ReservedSeat).Where(x => x.UserId == userId && x.ReservedSeat.FlightId == flightID).ToList();

            foreach (var seatReservationRequest in seatReservationRequests)
            {
                seatReservationRequest.Status = StatusFriendRequest.Accepted;
                _context.Entry(seatReservationRequest).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            return Ok();
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("RejectReservationRequests")]
        public async Task<IActionResult> RejectReservationRequests(Flight flightModel)
        {
            var flightID = flightModel.Id;
            var flight = _context.Flights.Include(x => x.ReservedSeats).Where(x => x.Id == flightID).ToList().First();
            if ((flight.DateDepart - DateTime.UtcNow).TotalHours < 3)
            {
                return BadRequest(new { message = "Cant canncel reservation !" });
            }
            else
            {
                string userId = User.Claims.ElementAt(0).Value;
                var seatReservationRequests = _context.SeatReservationRequests.Include(x => x.ReservedSeat).Where(x => x.UserId == userId && x.ReservedSeat.FlightId == flightID).ToList();

                foreach (var seatReservationRequest in seatReservationRequests)
                {
                    var reservedSeat = seatReservationRequest.ReservedSeat;
                    flight.VacantSeats++;
                    flight.BusySeats--;
                    _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    _context.Entry(seatReservationRequest).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
                    _context.Entry(reservedSeat).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
                    var result = await _context.SaveChangesAsync();
                }
                return Ok();
            }
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("ChangeFlightStatus")]
        public async Task<IActionResult> ChangeFlightStatus(Flight flightModel)
        {
            var flightID = flightModel.Id;
            var flight = _context.Flights.Include(x => x.ReservedSeats).Where(x => x.Id == flightID).ToList().First();
            if(flight != null)
            {
                flight.IsOver = true;
                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }

        
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("RateFlight")]
        public async Task<IActionResult> RateFlight(FlightMark flightModel)
        {
            int mark = flightModel.mark;
            string userId = User.Claims.ElementAt(0).Value;
            var flightID = flightModel.FlightId;
            var flight = _context.Flights.Include(x => x.Marks).Where(x => x.Id == flightID).ToList().First();
            //var user = _context.Users.Include(x => x.FlightMarks).Where(x => x.Id == userId).ToList().First();
            if (flight != null)
            {
                FlightMark flightMark = new FlightMark();
                flightMark.mark = mark;
                flight.Marks.Add(flightMark);
              //  user.FlightMarks.Add(flightMark);

                var airline = _context.Airlines.Include(x => x.Flights).Where(x => x.Id == flight.AirlineId).ToList().First();
                int sum=0;
                int cnt=0;
                foreach (var fli in airline.Flights)
                {
                    if(fli.Marks != null)
                    {
                        foreach (var mark1 in fli.Marks)
                        {
                            sum += mark1.mark;
                            cnt++;
                        }
                    } 
                }
                if(cnt > 0)
                {
                    sum = sum / cnt;
                    airline.Mark = sum;
                }
                _context.Entry(airline).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.Entry(flight).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
              //  _context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                var result = await _context.SaveChangesAsync();
                return Ok(new { result }); 
            }
            return BadRequest();
        }




    }
}
