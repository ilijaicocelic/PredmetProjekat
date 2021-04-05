import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { RentCarService } from 'src/app/services/rent-a-car-service/rent-a-car-service';
import { User } from 'src/app/entities/user/user';
import { RouterModule,Router }  from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { FirstLoginDialogComponent } from '../../first-login-dialog/first-login-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-my-rc-servis',
  templateUrl: './my-rc-servis.component.html',
  styleUrls: ['./my-rc-servis.component.css']
})
export class MyRcServisComponent implements OnInit {

  myrentcar: RentCar = new RentCar(-1,"","","",1);
  user: User;
  totalstar=5;
  
  constructor(private rentcarService: RentCarService  ,private router: Router,private route: ActivatedRoute,private userService : UserService,public dialog: MatDialog) { 

    this.rentcarService.GetCompanyInfo().subscribe((res:any)=> {
      this.myrentcar.address = res.comp.adress;
      this.myrentcar.name = res.comp.companyName;
      this.myrentcar.description = res.comp.description;
      this.myrentcar.id = res.comp.id;
      this.myrentcar.mark=res.comp.mark

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
    this.rentcarService.SaveChangeInfo(this.myrentcar).subscribe((res:any)=>{
      this.router.navigate(['myCarList'])
      alert("Successfuly saved ! ")
    });
  }

  openDialog1(): any{
    return this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
     
    });
  }
  
}
