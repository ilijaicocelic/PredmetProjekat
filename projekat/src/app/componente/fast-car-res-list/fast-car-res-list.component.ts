import { Component, OnInit } from '@angular/core';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { ReservedCar } from 'src/app/entities/ReservedCar/reserved-car';
import { Car } from 'src/app/entities/car/car';

@Component({
  selector: 'app-fast-car-res-list',
  templateUrl: './fast-car-res-list.component.html',
  styleUrls: ['./fast-car-res-list.component.css']
})
export class FastCarResListComponent implements OnInit {

  allReservations = new Array<ReservedCar>();

  constructor(private rentCarService: RentCarService) 
  {
    this.loadFastCarRes();
   }

   loadFastCarRes()
   {
     this.allReservations.length = 0;
    this.rentCarService.GetFastReservation().subscribe((res:any) =>
    {
        for (let i = 0; i < res.result.length; i++) {
          var car = new Car(0,res.result[i].location,res.result[i].brand,res.result[i].model,0,0,true,0,0);
          var temp = new ReservedCar(car,res.result[i].numberOfDays,new Date(res.result[i].pickupDate),new Date(res.result[i].returnDate));
          temp.id = res.result[i].id;
          temp.discount=res.result[i].discount;
          temp.totalPrice = res.result[i].totalPrice;
          this.allReservations.push(temp);
          
        }
    });
   }
  ngOnInit(): void {
  }

  Reserve(id: number)
  {
      this.rentCarService.ReserveFastReservation(id).subscribe((res:any )=>
      {
          this.loadFastCarRes();
      });
  }

}
