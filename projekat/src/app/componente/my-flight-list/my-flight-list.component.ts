import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { User } from 'src/app/entities/user/user';
import { Flight } from 'src/app/entities/flight/flight';
import { MatDialog } from '@angular/material/dialog';
import { ChangeFlightComponent } from '../change-flight/change-flight.component';
import { FirstLoginDialogComponent } from '../first-login-dialog/first-login-dialog.component';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-my-flight-list',
  templateUrl: './my-flight-list.component.html',
  styleUrls: ['./my-flight-list.component.css']
})
export class MyFlightListComponent implements OnInit {

  id: number;
  user: User;
  Flights = new Array<Flight>();
  totalstar=5;

  constructor(private airlineService: AirlineService ,private router: Router,private route: ActivatedRoute,private userService : UserService,public dialog: MatDialog) { 

    this.AllFlightsFun();
    let user=this.userService.GetUserProfileInfo().subscribe((res: any) => {
      this.user = new User(res.userinfo.username,res.userinfo.name,res.userinfo.surname,res.userinfo.email,res.userinfo.phoneNumber,res.userinfo.address,0,"");
      this.user.IsConfirmed = res.userinfo.isConfirmed;

      if(this.user.IsConfirmed == false)
      {
        this.openDialog1().afterClosed().subscribe(result =>
          {
            
          });
      }
      
    });
   
   
    
  }


  ngOnInit(): void {
  }


  AllFlightsFun() {
    this.Flights.length = 0;
    this.airlineService.GetFlightForAirline().subscribe((res: any) => {
      for (let i = 0; i < res.listflight.length; i++) {

        let transitList= new Array<string>();

        if(res.listflight[i].firstStop !=""){
          transitList.push(res.listflight[i].firstStop);
        }
        if(res.listflight[i].secondStop!=""){
          transitList.push(res.listflight[i].secondStop);
        }
        if(res.listflight[i].thirdStop!=""){
          transitList.push(res.listflight[i].thirdStop);
        }
        var dateDepart =  new Date(res.listflight[i].dateDepart); 
        dateDepart = new Date(Date.UTC(dateDepart.getFullYear(), dateDepart.getMonth(),dateDepart.getDate(), dateDepart.getHours(), dateDepart.getMinutes(), dateDepart.getSeconds()));
        var dateArrival = new Date(res.listflight[i].dateArrival);
        dateArrival = new Date(Date.UTC(dateArrival.getFullYear(), dateArrival.getMonth(),dateArrival.getDate(), dateArrival.getHours(), dateArrival.getMinutes(), dateArrival.getSeconds()));

         let flight= new Flight(res.listflight[i].id, res.listflight[i].flyingFrom, res.listflight[i].flyingTo, dateDepart, dateArrival , res.listflight[i].flightDistance, transitList, res.listflight[i].ticketPrice, res.listflight[i].vacantSeats, res.listflight[i].busySeats);
         var sum=0;
         var cnt=0;
         for (let j = 0; j < res.listflight[i].marks.length; j++) {
            sum += res.listflight[i].marks[j].mark;
            cnt++;
         }
         if(cnt > 0){
           flight.mark=sum/cnt;
         }

         this.Flights.push(flight);
      }
    });
  }


  Remove(flight : Flight,allFlight : Array<Flight>)
  {
    this.airlineService.DeleteFlightFromList(flight.id).subscribe((res: any) => {
      this.AllFlightsFun();
      alert(res.message);
    });
  }

  Modify(flight,allFlight)
  {
    this.openDialog(flight).afterClosed().subscribe(result => {
      if(result=="Cancel"){
        alert("Data is not changed.")
      }
      else{
        let newFlight= result as Flight;
        
        this.airlineService.SaveChangesOnFlight(newFlight).subscribe((res:any) => {
          this.AllFlightsFun();
          alert(res.message);
        });
      }
    });  
  }

  openDialog(flight1: Flight): any{
    return this.dialog.open(ChangeFlightComponent, {
      disableClose: true,
      data:{
         flight : flight1,
        }
    });
  }

  openDialog1(): any{
    return this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
     
    });
  }

}
