import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { Flight } from 'src/app/entities/flight/flight';
import { AirlineService } from 'src/app/services/airline-service/airline.service';

@Component({
  selector: 'app-admin-add-flight',
  templateUrl: './admin-add-flight.component.html',
  styleUrls: ['./admin-add-flight.component.css']
})
export class AdminAddFlightComponent implements OnInit {

 
  id: number;
  user: User;
  FlyingFrom="";
  FlyingTo ="";
  DateDepart ="";
  DateArrival="";
  FirstStop ="";
  SecondStop ="";
  ThirdStop="";
  TicketPrice ="";
  FlightLength="";
  DateArrivalMax ="";

  DateNow="";

  constructor(private userService: UserService,private airlineService : AirlineService, private route: ActivatedRoute,private router: Router) { 
    
    this.DateNow=this.converDateToString(new Date());
    this.DateDepart=this.DateNow;
  }

  ngOnInit(): void {
  }

  addDay(){
    let date=new Date(this.DateDepart);
    date.setDate(date.getDate() + 1);
    this.DateArrivalMax = this.converDateToString(date);
  }

  converDateToString(date : Date): string
  {
    let dateSplit = date.toLocaleString('it-IT').split("/");
    let year=dateSplit[2].split(", ")[0];
    let mount=  dateSplit[1];
    let day=dateSplit[0];
    let h=dateSplit[2].split(", ")[1].split(":")[0];
    let min=dateSplit[2].split(", ")[1].split(":")[1];

    let j=""
    if(mount.length==1){
      j="0" //Ako je mesec <10 dodaj 0 ispred
    }
    let date1= year + "-"+ j + mount + "-" + day  + "T" + h + ":" + min;
    return date1;
  }

  
  AddNewFlight(){

    if(this.FlyingFrom == "" && this.FlyingTo == "" && this.DateDepart == ""  && this.DateArrival == "" && this.FlightLength == "" && isNaN(Number(this.FlightLength)) && isNaN(Number(this.TicketPrice))){
      
      alert("All fields are required! ")

    }
    else if(Number(this.FlightLength) <= 0 || Number(this.TicketPrice) <= 0)
    {
      alert("Invalid input! ")
    }
    else{
      let transitList= new Array<string>();

      if(this.FirstStop !=""){
        transitList.push(this.FirstStop);
      }
      if(this.SecondStop!=""){
        transitList.push(this.SecondStop);
      }
      if(this.ThirdStop!=""){
        transitList.push(this.ThirdStop);
      }
      
      var dateDepart = new Date(this.DateDepart).toUTCString();
      var dateArrival = new Date(this.DateArrival).toUTCString();
   
      let flight= new  Flight(10,this.FlyingFrom,this.FlyingTo,new Date(dateDepart),new Date(dateArrival),Number(this.FlightLength),transitList,Number(this.TicketPrice), 120, 0);
      
      this.airlineService.AddingFlight(flight).subscribe((res:any) => {
       alert(res.message);
       this.router.navigate(['/myFlightList']);
      },err =>
      {
        console.log(err);
      });
    }
  }
}


