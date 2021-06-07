import {EmailSenderServiceImpl} from "../email-sender-service-impl";
import {EmailSenderServiceMock} from "../email-sender-service-mock";
import {EmailSenderService} from "../../email-sender-service";

describe('Email Sender Test', () => {
    const emailSenderService: EmailSenderService = new EmailSenderServiceMock();
    
    describe('Test mail for 2 remaining items function', () => {
        it('Should return true when calling', () => {
            expect(emailSenderService.sendMailFor2RemainingItems()).toEqual(true);
        })
    })
})
