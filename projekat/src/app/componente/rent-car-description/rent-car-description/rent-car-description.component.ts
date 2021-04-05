import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';

@Component({
  selector: 'app-rent-car-description',
  templateUrl: './rent-car-description.component.html',
  styleUrls: ['./rent-car-description.component.css']
})
export class RentCarDescriptionComponent implements OnInit {

  public rentcarId;
  public description ="";
  allrentcars: Array<RentCar>;

  constructor(private rentCarService: RentCarService,private route: ActivatedRoute) {
    
    let id = parseInt(this.route.snapshot.paramMap.get('idRC'));
    this.rentcarId = id;
    this.rentCarService.GetDescription(this.rentcarId).subscribe((res:any) => {
      this.description = res.description;
    });
  }

  ngOnInit(): void {
  }

}
