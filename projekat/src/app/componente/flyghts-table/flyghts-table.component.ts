import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { Flight } from 'src/app/entities/flight/flight';

@Component({
  selector: 'app-flyghts-table',
  templateUrl: './flyghts-table.component.html',
  styleUrls: ['./flyghts-table.component.css']
})
export class FlyghtsTableComponent implements OnInit {
  @Input() Flights;
  filteredFlights = new Array<Flight>();
  price: number = 500;

  constructor(private router: Router ) {}

  ngOnInit(): void {
    this.Flights.forEach(element => {
      this.filteredFlights.push(element);
      
    });
  }

  SelectFlight(flight){
    this.router.navigate(['/airline/' ,flight.id]) 
  }

  filterPrice()
  {
    var output1 = document.getElementById("price");
    this.filteredFlights.length = 0;
    this.Flights.forEach(element => {
      if(element.ticketPrice < parseInt(output1.innerText))
      {
        this.filteredFlights.push(element);
      }
    });
  }

  ChangeText(value : number)
  {

    var output = document.getElementById("price");
    output.innerText = value.toString();
  }

}
