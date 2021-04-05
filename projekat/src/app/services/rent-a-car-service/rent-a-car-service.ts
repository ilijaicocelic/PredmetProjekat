import { Injectable } from '@angular/core';
import { Car } from 'src/app/entities/car/car';
import { RentCar } from 'src/app/entities/rent-a-car/rent-a-car';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { ReservedCar } from 'src/app/entities/ReservedCar/reserved-car';


@Injectable({
    providedIn: 'root'
})

export class RentCarService{
    constructor(private http: HttpClient) { }

    readonly BaseURI = 'http://localhost:5001/api';

    

    GetCarForCompany()
    {
        return this.http.get(this.BaseURI + '/RentCar/GetCarForCompany');
    }

    GetCarWithId(id: number)
    {
        return this.http.get(this.BaseURI + '/RentCar/GetCarWithId/' + id);
    }

    SaveChangesOnCar(car : Car)
    {
        let body = {
            Location : car.location,
            PricePerDay : car.pricePerDay,
            NumberOfSeats : car.numberOfSeats,
            BabySeats : car.babySeats,
            Brand: car.brand,
            Year: car.year,
            Model: car.model
            
        }

        return this.http.post(this.BaseURI + '/RentCar/SaveChangesOnCar/' + car.id, body);
    }

    CancelCarReservation(id : number)
    {
        

        return this.http.get(this.BaseURI + '/RentCar/CancelCarReservation/' + id);
    }


    AddCar(car : Car)
    {
        let body = {
            Location : car.location,
            PricePerDay : car.pricePerDay,
            NumberOfSeats : car.numberOfSeats,
            BabySeats : car.babySeats,
            Brand: car.brand,
            Year: car.year,
            Model: car.model
            
        }

        return this.http.post(this.BaseURI + '/RentCar/AddingCar', body);
    }

    DeleteCarFromList(id: number)
    {
        return this.http.get(this.BaseURI + '/RentCar/DeleteCarFromList/' + id);
    }

    GetCompanyInfo()
    {
        return this.http.get(this.BaseURI + '/RentCar/GetCompanyInfo'); 
    }

    GetAllCarCompanies()
    {
        return this.http.get(this.BaseURI + '/RentCar/GetAllCarCompanies');
    }

    GetDescription(id: number)
    {
        return this.http.get(this.BaseURI + '/RentCar/GetDescription/' + id);
    }

    ShowBranches(id: number)
    {
        return this.http.get(this.BaseURI + '/RentCar/ShowBranches/' + id);
    }

    GetSearchedCars(location: string,pickupDate : Date,babyseats: number,numberOfSeats : number)
    {
        if(location == "")
        {
            location = "_";
        }
        return this.http.get(this.BaseURI + '/RentCar/GetSearchedCars/' + location+'/'+pickupDate.toDateString().replace(' ','_')+'/'+babyseats+'/'+numberOfSeats);
    }



    SaveChangeInfo(rentcar: RentCar)
    {
        var body = {
            Description: rentcar.description,
            CompanyName : rentcar.name,
            Id: rentcar.id,
            Adress: rentcar.address
        }

        return this.http.post(this.BaseURI + '/RentCar/SaveChangeInfo', body);
    }

    

    CarReservation(reservation : ReservedCar)
    {

        var body = {
            CarId: reservation.car.id,
            PickupDate: reservation.checkedInDate,
            ReturnDate : reservation.checkedOutDate,
            NumberOfDays : reservation.numberOfDays
        }
        return this.http.post(this.BaseURI + '/RentCar/CarReservation', body);
    }


    RateCar(car : Car, mark : number){
        var s=s;
        var body = {
            carId: car.id,
            mark: mark
        }
        return this.http.post(this.BaseURI + '/RentCar/RateCar',body);
    }

    MakeFastReservation(id: number, firstDate: Date,secondDate: Date,discount: number)
    {
        let body=
        {
            Id : id,
            FirstDate : firstDate,
            SecondDate: secondDate,
            Discount: discount

        }
        return this.http.post(this.BaseURI + '/RentCar/MakeFastReservation', body);
    }

    GetFastReservation()
    {

        return this.http.get(this.BaseURI + '/RentCar/GetFastReservation');
    }

    
    ReserveFastReservation(id: number)
    {

        return this.http.get(this.BaseURI + '/RentCar/ReserveFastReservation/' + id);
    }
   

}