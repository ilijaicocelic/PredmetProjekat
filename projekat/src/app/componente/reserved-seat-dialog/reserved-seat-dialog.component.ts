import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-reserved-seat-dialog',
  templateUrl: './reserved-seat-dialog.component.html',
  styleUrls: ['./reserved-seat-dialog.component.css']
})
export class ReservedSeatDialogComponent implements OnInit {

  public name : string="";
  public surname : string="";
  public passportNumber: string="";
  public UserID: string="";
  user: User;
  

  constructor(public dialogRef: MatDialogRef<ReservedSeatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.user=this.data.user;
    this.UserID = this.user.id;
  }

  ngOnInit(): void {
  }

  save(){
    let ns=Number(this.passportNumber);
    if(this.name!="" && this.surname!="" && this.passportNumber!="" && !isNaN(Number(this.passportNumber))){
      let userData= new Array<string>();
      userData.push(this.name);
      userData.push(this.surname);
      userData.push(this.passportNumber);
      userData.push(this.UserID);
      this.dialogRef.close(userData)
    }
    else if(this.passportNumber =="" || isNaN(Number(this.passportNumber))){
      alert("Unesite broj pasosa");
    }
    else{
      this.cancel();
    }
  }

  cancel(){
    this.dialogRef.close("Cancel");
  }

  inviteFriend(friend: User){
    this.name=friend.name;
    this.surname=friend.surname;
  
    //Potrebno prijatelju je poslati poruku sa zahtevom ovde
    this.UserID= friend.id;
   
  }
  myData(){
    this.name=this.user.name;
    this.surname=this.user.surname;
   
  }

}
