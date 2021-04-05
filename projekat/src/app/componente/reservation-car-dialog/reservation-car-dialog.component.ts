import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/entities/car/car';
import { ReservedCar } from 'src/app/entities/ReservedCar/reserved-car';

@Component({
  selector: 'app-reservation-car-dialog',
  templateUrl: './reservation-car-dialog.component.html',
  styleUrls: ['./reservation-car-dialog.component.css']
})
export class ReservationCarDialogComponent implements OnInit {

  car: Car;
  ReturnDate = "";
  DayOfReservation ="";
  TotalResult ="";
  numberOfDays =1;
  currentDate :string;
  
  
  constructor(public dialogRef: MatDialogRef<ReservationCarDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.car = this.data.car;
    this.currentDate = new Date().toString();
  }

  ngOnInit(): void {
  }

  Cancel(){
    this.dialogRef.close("Cancel");
  }

  Reserve(){
    var reservation = new ReservedCar(this.car,this.numberOfDays,new Date(this.DayOfReservation),new Date (this.ReturnDate));
    this.dialogRef.close(reservation);
  }

  CalculateDay()
  {
    if(this.DayOfReservation != "" && this.ReturnDate != "")
    {
      var msec = Date.parse(this.ReturnDate) - Date.parse(this.DayOfReservation);
      var mins = Math.floor(msec / 60000);
      var hrs = Math.floor(mins / 60);
      var days = Math.floor(hrs / 24);
      if(days >= 0)
      {
        if(days == 0)
        {
          days += 1;
        }
        this.numberOfDays = days;
      }
      else
      {
        this.numberOfDays = days;
        alert("Unvalid Date pick! ")
      }
    }
  }

}
