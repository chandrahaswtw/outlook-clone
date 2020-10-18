import React from 'react';
import './Root.scss';

// IMPORTING COMPONENTS
import Header from './Header/Header';
import Folders from './Folders/Folders';
import MailList from './MailList/MailList';
import MailBody from './MailBody/MailBody';

// ROOT FOLDER
const Root: React.FC = props => {

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