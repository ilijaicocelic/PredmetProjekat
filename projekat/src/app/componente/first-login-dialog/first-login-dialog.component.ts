import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import * as jwt_decode from "jwt-decode";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-first-login-dialog',
  templateUrl: './first-login-dialog.component.html',
  styleUrls: ['./first-login-dialog.component.css']
})
export class FirstLoginDialogComponent implements OnInit {

  confirmpassword = "";
  currentPassword = "";
  newpassword ="";

  constructor(private userService : UserService,public dialogRef: MatDialogRef<FirstLoginDialogComponent>) { }

  ngOnInit(): void {
  }

  SaveChanges()
  {
    let successful= true;
    if( this.confirmpassword.trim()==""){
      alert('Za promenu podataka morate potvrditi vasu lozinku');
    }
    
    else if(this.newpassword.length <= 6 ){
      alert('Sifra mora imati minimum 6 karaktera');

    }
    else if(this.newpassword != this.confirmpassword){
      alert('Sifre se ne podudaraju');
  
    }
    else{

      var decoded=jwt_decode(localStorage.getItem("token"));


     
      
      this.userService.SaveFirstLoginChanges(decoded.UserId,this.currentPassword,this.newpassword,this.confirmpassword).subscribe((res:any)=>{
       if(res.message == "Successfully changed.")
       {
         this.dialogRef.close();
       }

      });

    }
  }
}
