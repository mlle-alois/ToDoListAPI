import {EmailSenderService} from "../email-sender-service";

export class EmailSenderServiceImpl implements EmailSenderService {

    sendMailFor2RemainingItems() {
        console.log("Mail : Vous ne pouvez plus ajouter que 2 items");
        return true;
    }
}

export default EmailSenderServiceImpl;