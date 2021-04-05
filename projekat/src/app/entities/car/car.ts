export class Car{
    id: number;
    location: string;
   
    brand: string;
    model: string;
    year: number;
    pricePerDay:number;
    numberOfSeats: number;
    mark=0;
    
    
    babySeats: number;
   
    currentlyAvailable: boolean;
    
    

    constructor(id: number,location: string,brand: string,model: string,year: number,pricePerDay: number,available: boolean,babyseats:number,numberOfSeats: number)
    {
        this.id = id;
        this.location = location
        
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.currentlyAvailable = available;
        this.babySeats = babyseats;
       this.numberOfSeats = numberOfSeats;
       
    }
}