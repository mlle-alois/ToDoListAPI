
import {ToDoListModel, UserModel} from "../../../models";
import {UserServiceImpl} from "../user-service-impl";



describe('User test', () => {

    describe('Test is valid function', () => {

        let validBirthDate = new Date();
        validBirthDate.setFullYear(validBirthDate.getFullYear()-20);

        let invalidBirthDate8yo = new Date();
        invalidBirthDate8yo.setFullYear(invalidBirthDate8yo.getFullYear()-8);

        let validBirthDate13yo = new Date();
        validBirthDate13yo.setFullYear(validBirthDate13yo.getFullYear()-13);

        let emptyToDoList = new ToDoListModel();

        const userService = new UserServiceImpl();

        let user = new UserModel({
            email:"gerard@gmail.com",
            firstname:"Gerard",
            name:"Pion",
            password:"motdepasse",
            birthdate:validBirthDate,
            toDoList: emptyToDoList
        });
        beforeEach(() => {
           user.email = "gerard@gmail.com";
           user.firstname = "Gerard";
           user.name = "Pion";
           user.password = "motdepasse";
           user.birthdate = validBirthDate;
           user.toDoList = emptyToDoList;
        });

        it('Should return true Given valid user',() =>{

           expect(userService.isValid(user)).toEqual(true);
        })

        it('Should return false Given invalid mail uesr',() =>{
         user.email = "yoo";
            expect(userService.isValid(user)).toEqual(false);
        })

        it('Should return false Given invalid mail user 2',() =>{
            user.email = "yoo@yoo";
            expect(userService.isValid(user)).toEqual(false);
        })

        it('Should return false Given invalid mail user 3',() =>{
            user.email = "@yoo";
            expect(userService.isValid(user)).toEqual(false);
        })

        it('Should return false Given invalid name ',() =>{
            user.name = "";
            expect(userService.isValid(user)).toEqual(false);
        })
        it('Should return false Given invalid firstname',() =>{
            user.firstname = "";
            expect(userService.isValid(user)).toEqual(false);
        })
        it('Should return false Given birthday below 13',() =>{
            user.birthdate = invalidBirthDate8yo;
            expect(userService.isValid(user)).toEqual(false);
        })
        it('Should return false Given birthday equal 13',() =>{
            user.birthdate = validBirthDate13yo;
            expect(userService.isValid(user)).toEqual(true);
        })

        it('Should return false Given birthday equal 12 YO and 364 DAYS',() =>{
            validBirthDate13yo.setDate(validBirthDate13yo.getDate()+1);
            user.birthdate = validBirthDate13yo;
            expect(userService.isValid(user)).toEqual(false);
        })
      
     })
})     
