import React from 'react';
import { MailStore } from './MailStore';
import { MailContext } from './MailContext';
import { autorun, set, toJS } from 'mobx';

// JSON Documents import
import inboxJSONData from './../Assets/JSONData/inbox.json';
import spamJSONData from './../Assets/JSONData/spam.json';

// AUTO RUN - SYNCING DATA TO LOCAL STORAGE
export const localStorageSync = function (_this: MailStore) {
    let firstRun = true;

    // will run on change
    autorun(() => {
        // on load check if there's an existing store on localStorage and extend the store
        if (firstRun) {
            const existingStore = localStorage.getItem("OUTLOOK_CLONE")
            if (existingStore) {
                set(_this, JSON.parse(existingStore))
            }
            else {
                _this.inboxData = inboxJSONData;
                _this.spamData = spamJSONData;
            }
        }
        // from then on serialize and save to localStorage
        localStorage.setItem("OUTLOOK_CLONE", JSON.stringify(toJS(_this)));
    })

    firstRun = false
}

const mailStoreObj = new MailStore()

export const MailProvider: React.FC<React.PropsWithChildren<{}>> = props => {
    return <MailContext.Provider value={mailStoreObj}>
        {props.children}
    </MailContext.Provider>
}