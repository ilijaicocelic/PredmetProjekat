import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/entities/user/user';
import { NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Role } from 'src/app/entities/Enums/role.enum';
import { GoogleLoginProvider, SocialUser, SocialAuthService } from 'angularx-social-login';

import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public email="";
  public password="";

  constructor(private userService : UserService,private router : Router,private authService: SocialAuthService) {}

  ngOnInit(): void {
  }

  onSubmit() 
  {
      this.userService.Login(this.password,this.email).subscribe((res: any) => {
        localStorage.setItem("token",res.token); //

        try {
          var decoded=jwt_decode(res.token);
         
          if (decoded.Roles == "Registred") {
            this.router.navigate(['/profile']);
          }
          else if(decoded.Roles == "SystemAdmin"){
            this.router.navigate(['/all-airline']);
          }
          else if(decoded.Roles == "CarAdmin"){
            this.router.navigate(['/myCarList']);
          }
          else if(decoded.Roles == "AirlineAdmin"){
            this.router.navigate(['/myFlightList']);
          }

        }catch{}
      },
      err => {
        if (err.status == 400)
          alert('Incorrect username or password.');
        else
          console.log("err");
      });
  }

  signInWithGoogle(): void 
  {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers=>{
      this.userService.ExternalLogin(socialusers).subscribe( (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
      },
        err => {
          if (err.status == 400)
            alert('Incorrect username or password.');
          else
            console.log("err");
      });
    });
  }
}
