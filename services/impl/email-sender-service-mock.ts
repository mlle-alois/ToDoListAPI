import {EmailSenderServiceImpl} from "./email-sender-service-impl";
import {EmailSenderService} from "../email-sender-service";

export class EmailSenderServiceMock implements EmailSenderService {

    sendMailFor2RemainingItems() {
        return true;
    }
}

