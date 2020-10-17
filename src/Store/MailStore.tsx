import { observable, action, makeObservable, toJS, computed } from 'mobx';
import { mailStructure, FOLDER_TYPES } from './../Utils/models';

export class MailStore {

    @observable.shallow inboxData: mailStructure[];
    @observable.shallow spamData: mailStructure[];
    @observable.shallow deletedData: mailStructure[];
    @observable.shallow otherData: mailStructure[];
    @observable selectedID: string;
    @observable selectedFolder: FOLDER_TYPES;

    constructor() {
        makeObservable(this);
        this.inboxData = [];
        this.spamData = [];
        this.deletedData = [];
        this.otherData = [];
        this.selectedID = "";
        this.selectedFolder = FOLDER_TYPES.INBOX;
    }

    // SET THE INBOX DATA
    @action
    setInboxData = (param: mailStructure[]) => {
        this.inboxData = param;
    }

    // SET THE SPAM DATA
    @action
    setSpamData = (param: mailStructure[]) => {
        this.spamData = param;
    }

    // SET INBOX DATA
    @computed
    get getMailData() {
        switch (this.selectedFolder) {
            case FOLDER_TYPES.INBOX:
                return toJS(this.inboxData);

            case FOLDER_TYPES.SPAM:
                return toJS(this.spamData);

            case FOLDER_TYPES.DELETED:
                return toJS(this.deletedData);

            case FOLDER_TYPES.OTHER:
                return toJS(this.otherData);

            default:
                return toJS(this.inboxData);
        }
    }

    @computed
    get getUnreadCount() {
        let inboxUnreadCount = toJS(this.inboxData).filter(el => el.unread).length;
        let spamUnreadCount = toJS(this.spamData).filter(el => el.unread).length;
        let deletedUnreadCount = toJS(this.deletedData).filter(el => el.unread).length;
        let otherUnreadCount = toJS(this.otherData).filter(el => el.unread).length;
        return [inboxUnreadCount, spamUnreadCount, deletedUnreadCount,  otherUnreadCount]
    }

}