import { User } from './user';

describe('User',() =>{
    it('should create an istance',() =>{
        expect(new User()).toBeTruthy();
    });
});