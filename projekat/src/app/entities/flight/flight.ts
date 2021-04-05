import { Seat } from '../seat/seat';

export class Flight {
    
    id: number;
    flyingfrom : string;
    flyingTo: string;
    dateDepart: Date;
    dateArrival: Date;
    flightDuration: Date;
    flightDistance:number;
    numberTransit: number;
    Transitlocations: Array<string>;
    vacantSeats: number;
    busySeats: number;
    ticketPrice: number;
    reservedSeats= new Array<Seat>() ;//['A2', 'A3', 'F5', 'F1', 'F2','F6', 'F7', 'F8'];
    isOver : boolean;
    CancellingIsOver : boolean;

    mark = 0;  


    constructor(id: number, flyingfrom : string,flyingTo: string,dateDepart: Date,dateArrival: Date,flightDistance:number,Transitlocations: Array<string>,ticketPrice: number,  vacantSeats: number, busySeats: number){
       
        this.id=id;

        this.flyingfrom=flyingfrom;
        this.flyingTo=flyingTo;
        this.dateDepart=new Date(dateDepart.toLocaleString());
        this.dateArrival=new Date(dateArrival.toLocaleString());
        this.flightDuration= this.calculateDuration(dateArrival,dateDepart);
        this.flightDistance=flightDistance;
        
        this.Transitlocations=Transitlocations;
        this.vacantSeats=vacantSeats; // svaki let nek ima isto sedista zbog grafickog prikaza za rezervaciju sedista..
        this.ticketPrice=ticketPrice;
        this.busySeats=busySeats;

        this.numberTransit=this.Transitlocations.length;
    }

    

    calculateDuration(dateArrival: Date,dateDepart: Date): Date
    {
        var msec = dateArrival.getTime() - dateDepart.getTime();
        var mins = Math.floor(msec / 60000);
        var hrs = Math.floor(mins / 60);
        var days = Math.floor(hrs / 24);
        mins = mins % 60;
        //hrs = hrs % 24; necemo pisati dane posebno, ti dani ostaju u satima
        //days = days % 365;

        //var yrs = Math.floor(days / 365);
        return new Date(0,0,0,hrs,mins,0,0)
    }

}
