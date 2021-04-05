import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { Router } from '@angular/router';
import { Airline } from 'src/app/entities/airline/airline';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user-service/user.service';


@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {

  public name="";
  public username="";
  public address="";
  public mark;
  public destinations ="";
  public description="";
  public email= "";
  ocijena: number;

  constructor(private airlineService: AirlineService,private router: Router,private userService: UserService){ }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.ocijena = this.mark;
    if(this.name == "" || this.address == "" || this.username == ""  || this.email == "")
    {
      alert("You have to fill all fields, invalid request");
     
    }   
    else
    {
      this.userService.AddAdmin(this.name,this.description,this.username,this.address,"airline", this.email).subscribe((res: any ) =>{ 
        alert(res.message);
      } );
      
      this.router.navigate(['/all-airline']);
    }
  }

}


