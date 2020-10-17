import React, { useMemo, useContext } from 'react';
import classes from './MailBody.module.scss';
import envelope from './../../Assets/Images/envelope.svg';
import { observer } from 'mobx-react-lite';
import { MailContext } from './../../Store/MailContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const MailBody: React.FC = observer(props => {

    const mailData = useContext(MailContext);
    const { getMailData, selectedID } = mailData;

    const mailContent = useMemo<JSX.Element | null>(() => {
        if (getMailData.length) {
            if (!selectedID) {
                return (
                    <section className={classes.noMailContentWrapper}>
                        <img src={envelope} alt="no img" />
                        <div>Select an item to read</div>
                        <div>Nothing is selected !</div>
                    </section>
                )
            }
            return (
                <div className={classes.mainBody}>
                    <header className={classes.profileHeader}>
                        <FontAwesomeIcon size="3x" icon={faUserCircle} className={classes.profileIconStyles}></FontAwesomeIcon>
                        <FontAwesomeIcon size="sm" icon={faTrashAlt} className={classes.deleteIconStyles}></FontAwesomeIcon>
                    </header>
                    <hr />
                </div>
            )
        }
        return null;
    }, [getMailData, selectedID])

    return (
        <div className={classes.wrapper}>
            {mailContent}
        </div>
    )
})

export default MailBody;