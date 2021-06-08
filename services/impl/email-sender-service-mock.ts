import {EmailSenderService} from "../email-sender-service";

export class EmailSenderServiceMock implements EmailSenderService {

    sendMailFor2RemainingItems() {
        return true;
    }
}

