import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/services/airline-service/airline.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { Airline } from 'src/app/entities/airline/airline';
import { MatDialog } from '@angular/material/dialog';
import { FirstLoginDialogComponent } from '../first-login-dialog/first-login-dialog.component';

@Component({
  selector: 'app-my-airline-servis',
  templateUrl: './my-airline-servis.component.html',
  styleUrls: ['./my-airline-servis.component.css']
})
export class MyAirlineServisComponent implements OnInit {

  airline: Airline;
  user: User;
  totalstar= 5;

  constructor(private airlineService: AirlineService ,private router: Router,private route: ActivatedRoute,private userService : UserService,public dialog: MatDialog) { 

    this.airlineService.GetCompanyInfo().subscribe((res:any)=> {
      this.airline= new Airline(res.comp.id,res.comp.companyName,res.comp.adress,res.comp.description,res.comp.mark,"");
    })

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

  ChangeInfos()
  {
    if(this.airline.name.trim() != "" && this.airline.address.trim() != "" && this.airline.description.trim() != ""){
      this.airlineService.SaveChangeInfo(this.airline).subscribe((res:any)=>{
        this.router.navigate(['/myFlightList'])
        alert("Successfuly saved ! ")
      });
    }
    else{
      alert("Faild !");
    }
  }

  openDialog1(): any{
    return this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
     
    });
  }

}
