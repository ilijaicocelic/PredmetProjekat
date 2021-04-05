
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { Car } from 'src/app/entities/car/car';

@Component({
  selector: 'app-rent-car-branch',
  templateUrl: './rent-car-branch.component.html',
  styleUrls: ['./rent-car-branch.component.css']
})
export class RentCarBranchComponent implements OnInit {

  public rentcarId;
  public branches = "";
  allrentcars: Array<RentCar>;
  foundCars: Array<Car> = new Array<Car>();
  id: number = -1;

  constructor(private rentCarService: RentCarService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {

      this.id = params['idRC'];
      this.rentCarService.ShowBranches(this.id).subscribe((res: any) => {
      
        for (let i = 0; i < res.listcar.length; i++) {
          let car = new Car(res.listcar[i].id,res.listcar[i].location,res.listcar[i].brand,res.listcar[i].model,res.listcar[i].year,res.listcar[i].pricePerDay,true,res.listcar[i].babySeats,res.listcar[i].numberOfSeats);
          this.foundCars.push(car);
        };
      });
    });
  }

  ngOnInit(): void {
  }

}
