import { Component, OnInit , Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { Airline } from 'src/app/entities/airline/airline';

@Component({
  selector: 'app-airline-filtered',
  templateUrl: './airline-filtered.component.html',
  styleUrls: ['./airline-filtered.component.css']
})
export class AirlineFilteredComponent implements OnInit {

  allAirline = new Array<Airline>();
  @Input() user;
  id: number;
  RegistratedUser : number;
  totalstar=5;

  constructor(private router: Router, private route: ActivatedRoute, private userService : UserService, private airlinesService : AirlineService) {

    this.RegistratedUser=0;
    
    this.airlinesService.GetAllAirlineCompanies().subscribe((res:any) =>{
      for (let i = 0; i < res.airlines.length; i++) {
          var airline = new Airline(res.airlines[i].id,res.airlines[i].companyName,res.airlines[i].adress,res.airlines[i].description,res.airlines[i].mark,"");
          this.allAirline.push(airline);
      }
    });
  }

  ngOnInit(): void {
  }

  OnSubmit(airline){} // visak

  DestDugme(airline)
  {
    this.router.navigate(['/airDest/'.concat(airline.id.toString())]);
  }

}
