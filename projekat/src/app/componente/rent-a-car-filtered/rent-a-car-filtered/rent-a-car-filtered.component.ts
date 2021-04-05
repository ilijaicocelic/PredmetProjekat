import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';



@Component({
  selector: 'app-rent-a-car-filtered',
  templateUrl: './rent-a-car-filtered.component.html',
  styleUrls: ['./rent-a-car-filtered.component.css']
})
export class RentACarFilteredComponent implements OnInit {

  allrentcars : Array<RentCar> = new Array<RentCar>();
  @Input() user;

  id: number;
  RegistratedUser: number;
  totalstar=5;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private RentACars: RentCarService) {

    this.RentACars.GetAllCarCompanies().subscribe((res:any) =>{
      for (let i = 0; i < res.allCompanies.length; i++) {
          var temp = new RentCar(res.allCompanies[i].id,res.allCompanies[i].companyName,res.allCompanies[i].adress,res.allCompanies[i].description,res.allCompanies[i].mark);
          this.allrentcars.push(temp);
      }
    });
  }

  ngOnInit(): void {
  }
  
  OnSubmit(rentcars) {
    this.router.navigate(['/rentcDesc/'.concat(rentcars.id.toString())]);
  }
  FilialsClick(rentcars) {
    this.router.navigate(['/rentCarDest/'.concat(rentcars.id.toString())]);
  }
}
