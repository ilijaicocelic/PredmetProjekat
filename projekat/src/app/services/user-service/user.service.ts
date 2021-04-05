import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user/user';
import { Flight } from 'src/app/entities/flight/flight';
import { ReservedFlight } from 'src/app/entities/ReservedFlight/reserved-flight';
import { Car } from 'src/app/entities/car/car';
import { ReservedCar } from 'src/app/entities/ReservedCar/reserved-car';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService{
    readonly BaseURI = 'http://localhost:5001/api';
    constructor(private http: HttpClient) { }

   

    Register(newUser: User)
    {
        var body =  {
            name: newUser.name,
            surname: newUser.surname,
            username: newUser.username,
            email: newUser.email,
            PhoneNumber: newUser.phone,
            address: newUser.address,        
            password : newUser.password

        }

        return this.http.post(this.BaseURI + '/User/Register', body);
    }

    Login(password: string,email: string)
    {
        var body ={
            Email : email,
            Password : password 
        }

        return this.http.post(this.BaseURI + '/User/Login', body);
    }


    GetUserProfileInfo(){
        return this.http.get(this.BaseURI + '/User/GetUserProfileInfo');
    }


    SaveProfileInfoChanges(user:User,newpass:string,confnewpass:string){
     
     
        var body = {
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            PhoneNumber: user.phone,
            address: user.address,        
            password : user.password,
            newPassword: newpass,
            confirmPassword: confnewpass

           };
         
        return this.http.post(this.BaseURI + '/User/SaveProfileInfoChanges',body);
    }

    GetOtherUsers(){
        return this.http.get(this.BaseURI + '/User/GetOtherUsers');
    }


    SendRequest(userID: string)
    {
        var body = {
            userId2: userID
        }
        return this.http.post(this.BaseURI + '/User/SendRequest', body);
    }


    GetFriends(){
        return this.http.get(this.BaseURI + '/User/GetFriends');
    }

    RemoveFriend(userID: string){
        var body = {
            userId2: userID
        }
        return this.http.post(this.BaseURI + '/User/RemoveFriend', body);
    }


    GetFriendRequests(){
        return this.http.get(this.BaseURI + '/User/GetFriendRequests');
    }

    AcceptFriendRequest(userID: string){
        var body = {
            userId2: userID
        }
        return this.http.post(this.BaseURI + '/User/AcceptFriendRequest', body);
    }

    
    GetFriendSentRequest(){
        return this.http.get(this.BaseURI + '/User/GetFriendSentRequest');
    }


    DeleteRequest(userID: string){
        var body = {
            userId2: userID
        }
        return this.http.post(this.BaseURI + '/User/DeleteRequest', body);
    }


    CancelRequest(userID: string){
        var body = {
            userId2: userID
        }
        return this.http.post(this.BaseURI + '/User/CancelRequest', body);
    }



    AddAdmin(CompanyName: string,Description:string, AdminUsername: string, Address: string,TypeOfCompany: string,Email: string)
    {
        var body = {
            CompanyName: CompanyName,
            Description: Description,
            AdminUsername: AdminUsername,
            Address: Address,
            TypeOfCompany: TypeOfCompany,
            Email: Email

        }

        return this.http.post(this.BaseURI + '/User/AddingAdmin', body);
    }


    GetAirAdmins(){
        return this.http.get(this.BaseURI + '/User/GetAirAdmins');
    }

    GetCarAdmins(){
        return this.http.get(this.BaseURI + '/User/GetCarAdmins');
    }

    GetFlightReservations(){
        return this.http.get(this.BaseURI + '/User/GetFlightReservations');
    }

    GetSeatReservationRequests(){
        return this.http.get(this.BaseURI + '/User/GetSeatReservationRequests');
    }

   


    ExternalLogin(formData)
    {
        return this.http.post(this.BaseURI + '/User/GoogleLogin',formData);
    }
  

    GetCarReservations()
    {
        return this.http.get(this.BaseURI + '/User/GetCarReservations');
    }

    SaveFirstLoginChanges(userId: string,currentPassword: string,newPassword: string, confirmPassword: string)
    {
        var body = {
              
            userId : userId,
            password : currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword

        }

        return this.http.post(this.BaseURI + '/User/SaveFirstLoginChanges',body);
    }
  

}