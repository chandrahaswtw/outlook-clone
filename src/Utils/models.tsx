export interface mailStructure {
    mId : string,
    unread : boolean,
    subject : string,
    content : string
}

export enum FOLDER_TYPES {INBOX = "INBOX", SPAM = "SPAM", DELETED = "DELETED", OTHER = "OTHER FOLDER"}