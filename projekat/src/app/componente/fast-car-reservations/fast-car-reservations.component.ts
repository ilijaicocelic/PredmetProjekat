import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';

@Component({
  selector: 'app-fast-car-reservations',
  templateUrl: './fast-car-reservations.component.html',
  styleUrls: ['./fast-car-reservations.component.css']
})
export class FastCarReservationsComponent implements OnInit {
  firstDate = "";
  secondDate = "";
  discount = 0;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute,private rentCarService: RentCarService) {
    route.params.subscribe(params => {

      this.id = Number( params['id'] );
    });
   }

  ngOnInit(): void {
  }

  ChangeText(value : number)
  {

    var output = document.getElementById("discount");
    output.innerText = value.toString();

    
  

  }

  AddFastReservation()
  {
    var output1 = document.getElementById("discount");
      this.rentCarService.MakeFastReservation(this.id,new Date(this.firstDate),new Date(this.secondDate),parseInt(output1.innerText)).subscribe((res:any)=>
      {
          this.router.navigate(["myCarList"]);
      });
  }

}
