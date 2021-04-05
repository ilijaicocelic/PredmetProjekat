import { Airline } from './airline';

describe('Airline',() =>{
    it('should create an istance',() =>{
        expect(new Airline()).toBeTruthy();
    });
});