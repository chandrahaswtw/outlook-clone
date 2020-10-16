import React from 'react';
import classes from './MailList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'


const MailList: React.FC = props => {
    return (
        <div className={classes.wrapper}>
            <header>
                <span>
                    SELECTED ITEM
                </span>
                <span>
                    Filter <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </header>
            <main>MAILS COME HERE</main>
        </div>
    )
}

export default MailList;