import { observable, action, makeObservable, toJS, computed } from 'mobx';
import { mailStructure, FOLDER_TYPES } from './../Utils/models';
import {localStorageSync} from './MailProvider'

export class MailStore {

    @observable.shallow inboxData: mailStructure[];
    @observable.shallow spamData: mailStructure[];
    @observable.shallow deletedData: mailStructure[];
    @observable.shallow otherData: mailStructure[];
    @observable selectedID: string;
    @observable selectedFolder: FOLDER_TYPES;
    @observable flagIds: Array<string>;
    @observable flagFilter: boolean;

    constructor() {
        makeObservable(this);
        this.inboxData = [];
        this.spamData = [];
        this.deletedData = [];
        this.otherData = [];
        this.selectedID = "";
        this.selectedFolder = FOLDER_TYPES.INBOX;
        this.flagIds = [];
        this.flagFilter = false;
        localStorageSync(this);
    }

    // SET ID
    @action
    setID = (id: string) => {
        this.selectedID = id;
    }

    // SET SELECTED FOLDER FOLDER
    @action
    setFolder = (folderName: FOLDER_TYPES) => {
        this.selectedFolder = folderName;
        this.selectedID = "";
        this.flagFilter = false;
    }

    // MARK AS READ & UNREAD
    @action
    readTheMail = (mId: string, toggle: boolean = false,) => {
        let filteredDataClone = this.getMailData.map(el => {
            if (el.mId === mId) {
                return {
                    ...el, unread: toggle ? !el.unread : false
                }
            }
            return el;
        })
        this.syncTheData(filteredDataClone);
    }

    // DELETE MAIL
    @action
    deleteTheMail = (mId: string) => {

        if (mId === this.selectedID) {
            this.selectedID = ""
        }

        // INSERTING THE MAIL INTO DELETED FOLDER
        let deletedMail = this.getMailData.find(el => el.mId === mId);
        if (deletedMail) {
            this.deletedData.push(deletedMail)
        }

        // REMOVING THE MAIL FRON THE RESPECTIVE FOLDER
        let filteredData = this.getMailData.filter(el => el.mId !== mId);
        this.syncTheData(filteredData);

    }

    // SET THE FLAGS
    @action
    setFlags = (mId: string) => {
        var flagIdsClone = new Set(this.flagIds);
        flagIdsClone.has(mId) ? flagIdsClone.delete(mId) : flagIdsClone.add(mId);
        this.flagIds = Array.from(flagIdsClone);
    }

    // TOGGLE FLAG FILTER
    @action
    toggleFlagFilter = (val: boolean) => {
        this.flagFilter = val;
        this.selectedID = this.flagIds.includes(this.selectedID) ? this.selectedID : "";
    }

    // COMMON SYNCING THE FILES INTO THE RESPECTIVE FOLDERS
    @action
    syncTheData(data: mailStructure[]) {
        switch (this.selectedFolder) {
            case FOLDER_TYPES.INBOX:
                this.inboxData = data;
                break;

            case FOLDER_TYPES.SPAM:
                this.spamData = data;
                break;

            case FOLDER_TYPES.DELETED:
                this.deletedData = data;
                break;

            case FOLDER_TYPES.OTHER:
                this.otherData = data;
                break;

            default:
                break;
        }
    }

    // ******** COMPUTED DATA ***********
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
    get getFilteredData() {
        return this.getMailData.filter(el => this.flagIds.includes(el.mId))
    }


    @computed
    get getUnreadCount() {
        let inboxUnreadCount = toJS(this.inboxData).filter(el => el.unread).length;
        let spamUnreadCount = toJS(this.spamData).filter(el => el.unread).length;
        let deletedUnreadCount = toJS(this.deletedData).filter(el => el.unread).length;
        let otherUnreadCount = toJS(this.otherData).filter(el => el.unread).length;
        return [inboxUnreadCount, spamUnreadCount, deletedUnreadCount, otherUnreadCount]
    }

}

