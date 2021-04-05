import { Component, OnInit } from '@angular/core';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { Car } from 'src/app/entities/car/car';
import { element } from 'protractor';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  allrentcars: Array<RentCar>;
  Cars = new Array<Car>();
  pickUpDate = "";
  public pickUpLocation ="";
  seats: number = 0;
  Babyseats: number =0;
  test: boolean = false;
  
  ClickedToCheck: number;
  
  
  constructor(private rentCarService: RentCarService, private route: ActivatedRoute,private userService : UserService) {}

  ngOnInit(): void {
  }

  CheckCars(): void
  {
    this.Cars.length = 0;
    this.test=false;
      this.rentCarService.GetSearchedCars(this.pickUpLocation,this.pickUpDate == ""?new Date():new Date(this.pickUpDate),this.Babyseats,this.seats).subscribe((res:any)=>{
        for (let i = 0; i < res.cars.length; i++) {
            let car = new Car(res.cars[i].id,res.cars[i].location,res.cars[i].brand,res.cars[i].model,res.cars[i].year,res.cars[i].pricePerDay,true,res.cars[i].babySeats,res.cars[i].numberOfSeats)
          this.Cars.push(car);
        }
        this.test = true;
      });
  }
}
