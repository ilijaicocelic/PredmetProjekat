import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { Flight } from 'src/app/entities/flight/flight';
import { Car } from 'src/app/entities/car/car';
import { ReservedCar } from 'src/app/entities/ReservedCar/reserved-car';
import { ReservedFlight } from 'src/app/entities/ReservedFlight/reserved-flight';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-history-of-reservation',
  templateUrl: './history-of-reservation.component.html',
  styleUrls: ['./history-of-reservation.component.css']
})
export class HistoryOfReservationComponent implements OnInit {

  user :User;
  DateNow : Date;
  allReservations: Array<ReservedCar> = new Array<ReservedCar>();

  flightReservations = new Array<ReservedFlight>();
  flightReservationsRequests = new Array<ReservedFlight>();
  totalstar= 5;

  constructor(private userService: UserService ,private route: ActivatedRoute,private rentCarService: RentCarService, private airlineService: AirlineService) { 
  
    this.GetReservationsCar();
    this.GetFlightReservations();
    this.GetSeatReservationRequests();
    this.DateNow= new Date();
  }

  GetFlightReservations(){
    this.flightReservations.length = 0;
    this.userService.GetFlightReservations().subscribe((res:any) =>{
      for (let i = 0; i < res.reservations.length; i++) {

          var dateDepart =  new Date(res.reservations[i].flight.dateDepart); 
          dateDepart = new Date(Date.UTC(dateDepart.getFullYear(), dateDepart.getMonth(),dateDepart.getDate(), dateDepart.getHours(), dateDepart.getMinutes(), dateDepart.getSeconds()));
          var dateArrival = new Date(res.reservations[i].flight.dateArrival);
          dateArrival = new Date(Date.UTC(dateArrival.getFullYear(), dateArrival.getMonth(),dateArrival.getDate(), dateArrival.getHours(), dateArrival.getMinutes(), dateArrival.getSeconds()));
        
          var flight = new Flight(res.reservations[i].flight.id,res.reservations[i].flight.flyingFrom, res.reservations[i].flight.flyingTo,dateDepart , dateArrival, res.reservations[i].flight.flightDistance, new Array<string>(), res.reservations[i].flight.ticketPrice, res.reservations[i].flight.vacantSeats, res.reservations[i].flight.busySeats);
          flight.isOver=res.reservations[i].flight.isOver; 
          flight.CancellingIsOver=res.reservations[i].flight.cancellingIsOver; 
          var numOFSeats = res.reservations[i].numberOfSeats
          var resFlight = new ReservedFlight(flight, numOFSeats);
          resFlight.mark = res.reservations[i].mark;
          this.flightReservations.push(resFlight);
        }
    });
  }

  GetSeatReservationRequests(){
    this.flightReservationsRequests.length=0;
    this.userService.GetSeatReservationRequests().subscribe((res:any) =>{
      for (let i = 0; i < res.reservations.length; i++) {

        var dateDepart =  new Date(res.reservations[i].flight.dateDepart); 
        dateDepart = new Date(Date.UTC(dateDepart.getFullYear(), dateDepart.getMonth(),dateDepart.getDate(), dateDepart.getHours(), dateDepart.getMinutes(), dateDepart.getSeconds()));
        var dateArrival = new Date(res.reservations[i].flight.dateArrival);
        dateArrival = new Date(Date.UTC(dateArrival.getFullYear(), dateArrival.getMonth(),dateArrival.getDate(), dateArrival.getHours(), dateArrival.getMinutes(), dateArrival.getSeconds()));

        var flight = new Flight(res.reservations[i].flight.id,res.reservations[i].flight.flyingFrom, res.reservations[i].flight.flyingTo, dateDepart , dateArrival, res.reservations[i].flight.flightDistance, new Array<string>(), res.reservations[i].flight.ticketPrice, res.reservations[i].flight.vacantSeats, res.reservations[i].flight.busySeats);
        flight.isOver = res.reservations[i].flight.isOver; 
        flight.CancellingIsOver=res.reservations[i].flight.cancellingIsOver; 
        var numOFSeats = res.reservations[i].numberOfSeats
        var resFlight = new ReservedFlight(flight, numOFSeats);
        resFlight.mark = res.reservations[i].mark;
        resFlight.status=res.reservations[i].status;
        this.flightReservationsRequests.push(resFlight);
      }
    });
  }

  GetReservationsCar()
  {
    this.allReservations.length = 0;
    this.userService.GetCarReservations().subscribe((res:any) =>{
      for (let i = 0; i < res.reservations.length; i++) {
        var newcar  = new Car(res.reservations[i].carId,res.reservations[i].location,res.reservations[i].brand,res.reservations[i].model,-1,-1,false,-1,-1);
        var reservation = new ReservedCar(newcar,res.reservations[i].numberOfDays,res.reservations[i].pickupDate,res.reservations[i].returnDate);
        reservation.totalPrice  = res.reservations[i].totalPrice;
        reservation.id = res.reservations[i].id;

        reservation.isOver =  res.reservations[i].isOver;
        reservation.CancellingIsOver =  res.reservations[i].cancellingIsOver;
        reservation.mark = res.reservations[i].mark;


        this.allReservations.push(reservation);

      }
  });
  }
  ngOnInit(): void {
  }



  rateFlight($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}, flight : Flight) {
    /*  alert(`Old Value:${$event.oldValue}, 
       New Value: ${$event.newValue}, 
       Checked Color: ${$event.starRating.checkedcolor}, 
       Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
 
       this.airlineService.RateFlight(flight, $event.newValue).subscribe((res:any) =>{
         this.GetFlightReservations();
         this.GetSeatReservationRequests()
       });
   }

   rateCar($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}, car : Car) {
    /*  alert(`Old Value:${$event.oldValue}, 
       New Value: ${$event.newValue}, 
       Checked Color: ${$event.starRating.checkedcolor}, 
       Unchecked Color: ${$event.starRating.uncheckedcolor}`); */
 
       this.rentCarService.RateCar(car, $event.newValue).subscribe((res:any) =>{
        this.GetReservationsCar();
       });
   }

  buttonCancellationsCarReservation(reservedCar :  ReservedCar){
    this.DateNow= new Date();
    if(this.calculateHours(reservedCar.checkedInDate,this.DateNow) < 48 ){
      alert("Ne mozete odustati od ove rezervacije.Ostalo je manje od 2 dana do pocetka rezervacije.")
    
    }
    else{
      this.rentCarService.CancelCarReservation(reservedCar.id).subscribe((res:any)=>{
        alert("Successfuly canceled!")
        this.GetReservationsCar();
      });
    }
  }

  buttonCancellations(flight : Flight){
    this.DateNow= new Date();
    if(this.calculateHours(flight.dateDepart,this.DateNow) < 3){
      alert("Ne mozete odustati od ove rezervacije.Ostalo je manje od 3 sata do pocetka leta.")
      this.airlineService.ChangeFlightStatus(flight).subscribe((res:any) =>{
      });

    }
    else{
      this.airlineService.CancelFlightReservation(flight.id).subscribe((res:any)=>{
        alert("Successfuly canceled!")
        this.GetFlightReservations();
      });
    }
  }
  calculateDays(dateArrival: Date,dateDepart: Date): number
  {
    var msec = dateArrival.getTime() - dateDepart.getTime();
    var mins = Math.floor(msec / 60000);
    var hrs = Math.floor(mins / 60);
    var days = Math.floor(hrs / 24);
    
    return days;
  }

  calculateHours(dateArrival: Date,dateDepart: Date): number
  {
    var msec = dateArrival.getTime() - dateDepart.getTime();
    var mins = Math.floor(msec / 60000);
    var hrs = Math.floor(mins / 60);
    
    return hrs;
  }

  buttonAccept(flight : Flight){
    this.airlineService.AcceptReservationRequests(flight).subscribe((res:any) =>{
      this.GetSeatReservationRequests();
    });
  }

  buttonReject(flight : Flight){
    this.DateNow= new Date();
    if(this.calculateHours(flight.dateDepart,this.DateNow) < 3){
      alert("Ne mozete odustati od ove rezervacije.Ostalo je manje od 3 sata do pocetka leta.")
    }
    else{
      this.airlineService.RejectReservationRequests(flight).subscribe((res:any) =>{
        this.GetSeatReservationRequests();
      });
    }
  }

  buttonRate(flight : Flight){}
}
