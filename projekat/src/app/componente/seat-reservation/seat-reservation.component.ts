import { Component, OnInit } from '@angular/core';
import { ReservedSeatDialogComponent } from '../reserved-seat-dialog/reserved-seat-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/entities/flight/flight';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA}from '@angular/material/dialog';
import { Seat } from 'src/app/entities/seat/seat';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/scroll/scroll-strategy';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { RegistredGuardGuard } from 'src/app/guards/registred-guard.guard';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit {
 
  flight : Flight; 
  user : User;

  flies:string ="";//Tekst koji se ispisuje na vrhu
 
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  cols: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18,19,20];

  reserved = new Array<string>(); //koristimo za prikaz sedista koja su vec bila rezervisana
  reservedSeats = new Array<Seat>(); //sedista koja smo slektoval(sa podacima o korisniku sedista)

  selected: string[] = []; // pozicija selektovanih sedista
 

  ticketPrice: number ;
  totalPrice: number = 0;

  constructor(private userService : UserService, private router: Router ,private route: ActivatedRoute, private airlineService : AirlineService, public dialog: MatDialog) {
  
    
    let flightid = parseInt(this.route.snapshot.paramMap.get('flightID'));
    
    airlineService.GetFlightWithId(flightid).subscribe((res:any)=>{
      let transitList= new Array<string>();

      if(res.flight.firstStop !=""){
        transitList.push(res.flight.firstStop);
      }
      if(res.flight.secondStop!=""){
        transitList.push(res.flight.secondStop);
      }
      if(res.flight.thirdStop!=""){
        transitList.push(res.flight.thirdStop);
      }
      this.flight = new Flight(res.flight.id, res.flight.flyingFrom, res.flight.flyingTo, new Date(res.flight.dateDepart),new Date(res.flight.dateArrival), res.flight.flightDistance, transitList, res.flight.ticketPrice, res.flight.vacantSeats, res.flight.busySeats);
      this.flies = "Flies from " + this.flight.flyingfrom.toUpperCase() + ' to ' + this.flight.flyingTo.toUpperCase();// + ' with ' + this.flight.name.toUpperCase();
      this.ticketPrice = this.flight.ticketPrice;

      for (let i = 0; i < res.flight.reservedSeats.length; i++) {
        var seat= new Seat();
        this.reserved.push(res.flight.reservedSeats[i].seatName);
      }
    });

    let user=this.userService.GetUserProfileInfo().subscribe((res: any) => {

      this.user = new User(res.userinfo.username,res.userinfo.name,res.userinfo.surname,res.userinfo.email,res.userinfo.phoneNumber,res.userinfo.address,0,"");
      if(this.user != null){
        try {
          var decoded=jwt_decode(localStorage.getItem("token"));
          if (decoded.Roles == "Registred") 
          {
            this.user.id=decoded.UserId;
          
              this.userService.GetFriends().subscribe((res: any) => {
                for (let i = 0; i < res.friends.length; i++) {
                  var friend= new User(res.friends[i].username,res.friends[i].name,res.friends[i].surname,res.friends[i].email,res.friends[i].phoneNumber,res.friends[i].address,res.friends[i].role,"");
                  friend.id=res.friends[i].id;
                  this.user.friends.push(friend);
                }
              });
            
          }
        }
        catch{}  
      }

    });
  
   }

  ngOnInit(): void {
  }


  //return status of each seat
  getStatus(seatPos: string) {
      if(this.reserved.indexOf(seatPos) !== -1) {
          return 'reserved';
      } else if(this.selected.indexOf(seatPos) !== -1) {
          return 'selected';
      }
  }
  //clear handler
  Back() {
      this.selected = [];
      this.reservedSeats = [];
      this.router.navigate(['/airline']) 
  }
  //click handler
  seatClicked(seatPos: string) {
    var index = this.selected.indexOf(seatPos);
      
    if(this.reserved.indexOf(seatPos) === -1){
      this.openDialog(seatPos).afterClosed().subscribe(result => {
        if(result=="Cancel"){
          alert("Rezervisanje ovog sedista nije uspelo. Pokusajte ponvo.")
        }
        else{
          result= result as Array<string>;
          let seat= new Seat();
          seat.seatName=seatPos;
          seat.nameOfUser=result[0];
          seat.surnameOfUser= result[1];
          seat.passportNumberOfUser= result[2];
          seat.userID= result[3];
          seat.flightID= this.flight.id;
              
          this.selected.push(seatPos);
          this.reservedSeats.push(seat);
        }
      });  
    }
  }
  showSelected = function() {
      if(this.selected.length > 0) 
      {
        this.reservedSeats.forEach(reservedSeat => {
          this.airlineService.SeatReservation(reservedSeat).subscribe((res:any) =>
          {
          });
        });

        this.user.flightReservations.push(this.flight);

        //Ovde poslati mejl korisniku za informaciju o destinaciji
        alert("Reserved Seats: " + this.selected + "\nTotal: "+(this.ticketPrice * this.selected.length) + "€");

        this.router.navigate(['/history-of-reservation']) 

      } else {
          alert("No seats selected!");
      }
  }

  openDialog(seatPos: string): any{
    try {
      var decoded=jwt_decode(localStorage.getItem("token"));
     
      if (decoded.Roles != "Registred") 
      {
        alert("Morate biti registrovani za dalje akcije ")
      }
      else{
        return this.dialog.open(ReservedSeatDialogComponent, {
          disableClose: true,
          data:{
             user : this.user,
             flight : this.flight
            }
        });
      }
    }
    catch{
      alert("Morate biti registrovani za dalje akcije ")
    }

  }

}
