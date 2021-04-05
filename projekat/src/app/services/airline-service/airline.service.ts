import { Injectable } from '@angular/core';
import { Airline } from 'src/app/entities/airline/airline';
import { Flight } from 'src/app/entities/flight/flight';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { Seat } from 'src/app/entities/seat/seat';

@Injectable({
    providedIn: 'root'
})

export class AirlineService{
    
    constructor(private http: HttpClient) {}
    readonly BaseURI = 'http://localhost:5002/api';


    GetAllAirlineCompanies(){
        return this.http.get(this.BaseURI + '/Flight/GetAllAirlineCompanies');
    }

    GetFlightForAirline(){
        return this.http.get(this.BaseURI + '/Flight/GetFlightForAirline');
    }
    AddingFlight(flight : Flight)
    {
        let FirstStop ="";
        let SecondStop= "";
        let ThirdStop="";
        for (let i = 0; i < flight.Transitlocations.length; i++) {
           if(i==0){
               FirstStop = flight.Transitlocations[i];
           }
           else  if(i==1){
             SecondStop = flight.Transitlocations[i];
           }
           else{
              ThirdStop = flight.Transitlocations[i];
           }
        }
        
        let body = {
            FlyingFrom: flight.flyingfrom,
            FlyingTo: flight.flyingTo,
            FlightDistance: flight.flightDistance,
            DateDepart: flight.dateDepart,
            DateArrival: flight.dateArrival,
            TicketPrice: flight.ticketPrice,
            FirstStop: FirstStop,
            SecondStop: SecondStop,
            ThirdStop: ThirdStop
            
        }

        return this.http.post(this.BaseURI + '/Flight/AddingFlight', body);
    }


    DeleteFlightFromList(id: number)
    {
        return this.http.get(this.BaseURI + '/Flight/DeleteFlightFromList/' + id);
    }


    
    SaveChangesOnFlight(flight : Flight)
    {
        let FirstStop ="";
        let SecondStop= "";
        let ThirdStop="";
        for (let i = 0; i < flight.Transitlocations.length; i++) {
           if(i==0){
               FirstStop = flight.Transitlocations[i];
           }
           else  if(i==1){
             SecondStop = flight.Transitlocations[i];
           }
           else{
              ThirdStop = flight.Transitlocations[i];
           }
        }

        let body = {
            FlyingFrom: flight.flyingfrom,
            FlyingTo: flight.flyingTo,
            FlightDistance: flight.flightDistance,
            DateDepart: flight.dateDepart,
            DateArrival: flight.dateArrival,
            TicketPrice: flight.ticketPrice,
            FirstStop: FirstStop,
            SecondStop: SecondStop,
            ThirdStop: ThirdStop
            
        }

        return this.http.post(this.BaseURI + '/Flight/saveChangesOnFlight/' +flight.id, body);
    }

    GetCompanyInfo()
    {
        return this.http.get(this.BaseURI + '/Flight/GetCompanyInfo'); 
    }

    SaveChangeInfo(airline: Airline)
    {
        var body = {
            Description: airline.description,
            CompanyName : airline.name,
            Id: airline.id,
            Adress: airline.address
        }

        return this.http.post(this.BaseURI + '/Flight/SaveChangeInfo', body);
    }

    GetFlighs(airlineID: number)
    {
        return this.http.get(this.BaseURI + '/Flight/GetFlighs/' + airlineID);
    }



    GetSearchedFlights(flyingfrom: string, flyingTo : string, dateDepart: string , numberOfSeat : number, dateReturn: string)
    {
       
        return this.http.get(this.BaseURI + '/Flight/GetSearchedFlights/' + flyingfrom +'/'+ flyingTo +'/'+ dateDepart +'/'+ numberOfSeat +'/'+ dateReturn);
    
    }

    GetFlightWithId(id: number)
    {
        return this.http.get(this.BaseURI + '/Flight/GetFlightWithId/' + id);
    }

    SeatReservation(seat : Seat){
        var body = {
            seatName: seat.seatName,
            NameOfUser: seat.nameOfUser,
            SurnameOfUser : seat.surnameOfUser,
            passportNumberOfUser : seat.passportNumberOfUser,
            userID: seat.userID,
            flightID: seat.flightID
        }
        return this.http.post(this.BaseURI + '/Flight/SeatReservation', body);
    }


    CancelFlightReservation(id : number)
    {
        return this.http.get(this.BaseURI + '/Flight/CancelFlightReservation/' + id);
    }


    AcceptReservationRequests(flight : Flight){
        var body = {
            id: flight.id
        }
        return this.http.post(this.BaseURI + '/Flight/AcceptReservationRequests',body);
    }

    RejectReservationRequests(flight : Flight){
        var body = {
            id: flight.id
        }
        return this.http.post(this.BaseURI + '/Flight/RejectReservationRequests',body);
    }

    ChangeFlightStatus(flight : Flight){
        var body = {
            id: flight.id
        }
        return this.http.post(this.BaseURI + '/Flight/ChangeFlightStatus',body);
    }

    RateFlight(flight : Flight, mark : number){
        var body = {
            FlightId: flight.id,
            mark: mark
        }
        return this.http.post(this.BaseURI + '/Flight/RateFlight',body);
    }

}