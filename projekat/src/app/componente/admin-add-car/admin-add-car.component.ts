import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/entities/car/car';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';

@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent implements OnInit {

  id: number = -1;
  user: User;
 Location ="";
 year : number;
 dateReturn ="";
 PricePerDay="";
 Brand ="";
 NumberOfSeats ="";
 CarModel="";
 Babyseats ="";
 modify: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute,private router: Router,private carService: RentCarService) { 
    route.params.subscribe(params => 
      {
       
        this.id=params['id'];
        if(this.id!== undefined )
        {
          this.modify = true;
        } 
      });

      if(this.modify){
        carService.GetCarWithId(this.id).subscribe((res:any)=>{
          this.CarModel = res.car.model;
          this.Location = res.car.location;
          this.PricePerDay = res.car.pricePerDay;
          this.Brand = res.car.brand;
          this.Babyseats = res.car.babySeats;
          this.NumberOfSeats = res.car.numberOfSeats;
          this.year = res.car.year;


        });
        
      }
  }

  ngOnInit(): void {
  }

  AddNewCar()
  {
    if(this.Location == "" ||   isNaN(Number(this.NumberOfSeats)) || isNaN(Number(this.PricePerDay)) || this.Brand == "" || this.CarModel == "" ||  isNaN(Number(this.year)) || isNaN(Number(this.Babyseats)) )
    {
      alert("All fields are required! ")
    }
    else if(Number(this.year) <= 0 || Number(this.PricePerDay) <= 0 || Number(this.Babyseats) <=0 ||Number(this.NumberOfSeats) <=0)
    {
      alert("Invalid input! ")
    }
    else
    {      
      let newCar = new Car(this.id,this.Location,this.Brand,this.CarModel,Number(this.year),Number(this.PricePerDay),true,Number(this.Babyseats),Number(this.NumberOfSeats));
      if(this.modify == false)
      {
        this.carService.AddCar(newCar).subscribe((res:any) => {
          alert(res.message);
          this.router.navigate(['/myCarList']);

        },err =>
        {
          console.log(err);
        });

      }
      else
      {
        this.carService.SaveChangesOnCar(newCar).subscribe((res:any) => {
          alert(res.message);
          this.router.navigate(['/myCarList']);
        },err =>
        {
          console.log(err);
        });
      }
    }
  }
}
