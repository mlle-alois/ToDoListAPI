
import { UserModel } from "../../../models";
import { UserServiceImpl } from "../user-service-impl";
import { DatabaseUtils } from "../../../database/database-tests";



describe('User test', () => {

    describe('Test is valid function', () => {
            let validBirthDate = new Date();
            validBirthDate.setFullYear(validBirthDate.getFullYear() - 20);

            let invalidBirthDate8yo = new Date();
            invalidBirthDate8yo.setFullYear(invalidBirthDate8yo.getFullYear() - 8);

            let validBirthDate13yo = new Date();
            validBirthDate13yo.setFullYear(validBirthDate13yo.getFullYear() - 13);

            let user = new UserModel({
                id: 0,
                email: "gerard@gmail.com",
                firstname: "Gerard",
                name: "Pion",
                password: "motdepasse",
                birthdate: validBirthDate,
            });

            beforeEach(async () => {
                user.id = 0;
                user.email = "gerard@gmail.com";
                user.firstname = "Gerard";
                user.name = "Pion";
                user.password = "motdepasse";
                user.birthdate = validBirthDate;
            });

            it('Should return true Given valid user', async () => {
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                expect(userService.isValid(user)).toEqual(true);
            })

            it('Should return false Given invalid mail uesr', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.email = "yoo";
                expect(userService.isValid(user)).toEqual(false);
            })

            it('Should return false Given invalid mail user 2', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.email = "yoo@yoo";
                expect(userService.isValid(user)).toEqual(false);
            })

            it('Should return false Given invalid mail user 3', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.email = "@yoo";
                expect(userService.isValid(user)).toEqual(false);
            })

            it('Should return false Given invalid name ', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.name = "";
                expect(userService.isValid(user)).toEqual(false);
            })
            it('Should return false Given invalid firstname', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.firstname = "";
                expect(userService.isValid(user)).toEqual(false);
            })
            it('Should return false Given birthday below 13', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.birthdate = invalidBirthDate8yo;
                expect(userService.isValid(user)).toEqual(false);
            })
            it('Should return false Given birthday equal 13', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                user.birthdate = validBirthDate13yo;
                expect(userService.isValid(user)).toEqual(true);
            })

            it('Should return false Given birthday equal 12 YO and 364 DAYS', async () => {
                
                const connection = await DatabaseUtils.getConnection();
                const userService = new UserServiceImpl(connection);
                validBirthDate13yo.setDate(validBirthDate13yo.getDate() + 1);
                user.birthdate = validBirthDate13yo;
                expect(userService.isValid(user)).toEqual(false);
            })

    })
})
