import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { NgForm } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { FirstLoginDialogComponent } from '../first-login-dialog/first-login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as jwt_decode from "jwt-decode";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: number;
  user: User;


  name="";
  surname="";
  phoneNumber="";
  address="";
  confirmpassword = "";
  currentPassword = "";
  newpassword ="";
  checkBox =false;
  
  constructor(private userService: UserService, private route: ActivatedRoute,public dialog: MatDialog) {
   
    let user=this.userService.GetUserProfileInfo().subscribe((res: any) => {
      this.user = new User(res.userinfo.username,res.userinfo.name,res.userinfo.surname,res.userinfo.email,res.userinfo.phoneNumber,res.userinfo.address,0,"");

      this.name=this.user.name;
      this.surname=this.user.surname;
      this.phoneNumber=this.user.phone;
      this.address=this.user.address;

      this.user.IsConfirmed = res.userinfo.isConfirmed;
      var decoded=jwt_decode(localStorage.getItem("token"));
      if(this.user.IsConfirmed == false && decoded.Roles != "Registred" && decoded.Roles != "SystemAdmin")
      {
        this.openDialog1().afterClosed().subscribe(result =>
          {
            
          });
      }
    });
   }

  ngOnInit(): void {
  }

  saveChanges() : void{
    let successful= true;
    if(this.checkBox==true && this.confirmpassword.trim()==""){
      alert('Za promenu podataka morate potvrditi vasu lozinku');
    }
    else if(this.name.trim()=="" || this.phoneNumber =="" || this.surname.trim()=="" || this.address.trim()=="" ){
      alert('Obavezna polja moraju biti popunjena');

    }
    else if(this.newpassword.length <= 6 && this.checkBox==true){
      alert('Sifra mora imati minimum 6 karaktera');

    }
    else if(this.checkBox==true && this.newpassword != this.confirmpassword){
      alert('Sifre se ne podudaraju');
  
    }
    else{
      this.user.password=this.currentPassword;
      this.user.name=this.name;
      this.user.surname=this.surname;
      this.user.phone=this.phoneNumber;
      this.user.address=this.address
      this.userService.SaveProfileInfoChanges(this.user,this.newpassword,this.confirmpassword).subscribe((res:any)=>{
        alert(res.message);
      });
    }
  }

  openDialog1(): any{
    return this.dialog.open(FirstLoginDialogComponent, {
      disableClose: true,
     
    });
  }
  
}
