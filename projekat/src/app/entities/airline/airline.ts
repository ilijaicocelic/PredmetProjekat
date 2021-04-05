import { Flight } from '../flight/flight';

export class Airline{

    id: number;
    name: string;
    address: string;
    description: string;
    mark: number;
    activated:boolean;
    flights= new Array<Flight>();

    adminName= "";
  
    

    constructor(id:number,name: string,address: string,description: string,mark: number,adminName :string)
    {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
        this.mark = mark;
        this.adminName=adminName;
    }
}