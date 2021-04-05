import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flight } from 'src/app/entities/flight/flight';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-change-flight',
  templateUrl: './change-flight.component.html',
  styleUrls: ['./change-flight.component.css']
})
export class ChangeFlightComponent implements OnInit {

  flight:Flight;
 
  FlyingFrom="";
  FlyingTo ="";
  DateDepart ="";
  DateArrival ="";
  FirstStop ="";
  SecondStop ="";
  ThirdStop="";
  TicketPrice ="";
  FlightLength="";
  DateNow="";
 
  constructor(public dialogRef: MatDialogRef<ChangeFlightComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
      this.flight=this.data.flight
      this.FlyingFrom=this.flight.flyingfrom;
      this.FlyingTo=this.flight.flyingTo;
      this.DateDepart=this.converStringToDate(this.flight.dateDepart);
      this.DateArrival=this.converStringToDate(this.flight.dateArrival);
      this.DateNow=this.converStringToDate(new Date());
      let cnt=0;
      for (let i of this.flight.Transitlocations){
        if(cnt==0){
          this.FirstStop=i;
          cnt++;
        }
        else if(cnt==1){
          this.SecondStop=i;
          cnt++
        }
        else{
          this.ThirdStop=i;
        }
      }
      this.TicketPrice=this.flight.ticketPrice.toString();
      this.FlightLength=this.flight.flightDistance.toString();
    }

  ngOnInit(): void {
  }

  converStringToDate(date : Date): string
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
    let k=""
    if(day.length==1){
      k="0" //Ako je mesec <10 dodaj 0 ispred
    }
    let date1= year + "-"+ j + mount + "-" + k + day  + "T" + h + ":" + min;
    return date1;
  }

  Submit(){
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
   
      let flight= new  Flight(this.flight.id,this.FlyingFrom,this.FlyingTo,new Date(this.DateDepart),new Date(this.DateArrival),Number(this.FlightLength),transitList,Number(this.TicketPrice), this.flight.vacantSeats, this.flight.busySeats);
      this.dialogRef.close(flight)
    }
  }
  
  Cancel(){
    this.dialogRef.close("Cancel");
  }
}
