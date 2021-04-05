import { Car } from '../car/car';

export class ReservedCar {

    car: Car;
    numberOfDays : number;
    
    checkedInDate: Date;
    checkedOutDate: Date;
    totalPrice: number;
    id: number;

    isOver : boolean;
    CancellingIsOver : boolean;
    discount: number;
    mark = 0;

    constructor(car: Car, numberOfDays : number,checkedInDate: Date,checkedOutDate: Date){
        this.car=car;
        this.numberOfDays=numberOfDays;
       
        this.checkedInDate =new Date( checkedInDate);
        

        this.checkedOutDate = new Date(checkedOutDate);
        let dan = this.checkedOutDate.getDay();
        this.numberOfDays = this.CalculateDay(this.checkedOutDate,this.checkedInDate);


    }
  CalculateDay(returnDate: Date,pickupDate: Date): number
  {
    
      var msec = returnDate.getTime() - pickupDate.getTime();
     var mins = Math.floor(msec / 60000);
     var hrs = Math.floor(mins / 60);
     var days = Math.floor(hrs / 24);
     
    if(days == 0)
    {
        days+=1;
    }
     return days;


    
    

  }

}
