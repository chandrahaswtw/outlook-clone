import React, { useEffect, useContext } from 'react';
import './Root.scss';

// IMPORTING COMPONENTS
import Header from './Header/Header';
import Folders from './Folders/Folders';
import MailList from './MailList/MailList';
import MailBody from './MailBody/MailBody';
import { MailContext } from './../Store/MailContext';

// JSON Documents import
import inboxJSONData from './../Assets/JSONData/inbox.json';
import spamJSONData from './../Assets/JSONData/spam.json';

// ROOT FOLDER
const Root: React.FC = props => {

    let mailData = useContext(MailContext);

    // PERFECT PLACE TO MAKE A SERVICE CALL. WE ARE CURRENTLY LOADING DATA FROM JSON INSTEAD !!
    useEffect(() => {
        mailData.setInboxData(inboxJSONData);
        mailData.setSpamData(spamJSONData);
    }, [mailData])

    return (
        <div className="root-wrapper">
            <section className="root-header">
                <Header></Header>
            </section>
            <section className="root-folders">
                <Folders></Folders>
            </section>
            <section className="root-maillist">
                <MailList></MailList>
            </section>
            <section className="root-mailbody">
                <MailBody></MailBody>
            </section>
        </div>
    )
}

export default Root;