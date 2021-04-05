import { Car } from './car';

describe('Car',() =>{
    it('should create an isntance',() =>{
        expect(new Car()).toBeTruthy();
    });
});