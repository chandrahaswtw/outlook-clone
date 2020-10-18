import React, { useMemo, useContext, useCallback } from 'react';
import classes from './MailBody.module.scss';
import envelope from './../../Assets/Images/envelope.svg';
import { observer } from 'mobx-react-lite';
import { MailContext } from './../../Store/MailContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FOLDER_TYPES } from './../../Utils/models';

// MAIL BODY
const MailBody: React.FC = observer(props => {

    // FETCHING DATA FROM STORE
    const mailData = useContext(MailContext);
    const { getMailData, selectedID, selectedFolder, deleteTheMail, flagFilter, getFilteredData } = mailData;

    // FETCHING THE INDIVIDUAL DETAILS
    const mailJSON = useMemo(() => {
        return (flagFilter ? getFilteredData :getMailData)!.find(el => el.mId === selectedID);
    }, [getMailData, selectedID, getFilteredData, flagFilter])

    // DELETE CLICK HANDLER
    const deleteClickHandler = useCallback((mId: string | undefined, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (mId) {
            deleteTheMail(mId);
        }
    }, [deleteTheMail])

    // CREATING THE MAIL BODY
    const mailContent = useMemo<JSX.Element | null>(() => {
        if (flagFilter ? getFilteredData.length :getMailData.length) {
            if (!selectedID) {
                return (
                    <section className={classes.noMailContentWrapper}>
                        <img src={envelope} alt="no img" />
                        <div>Select an item to read</div>
                        <div>Nothing is selected !</div>
                    </section>
                )
            }
            else if (mailJSON) {
                return (
                    <div className={classes.mainBody}>
                        <header className={classes.profileHeader}>
                            <div className={classes.outerFlex}>
                                <FontAwesomeIcon size="3x" icon={faUserCircle} className={classes.profileIconStyles}></FontAwesomeIcon>
                                <div className={classes.innerFlex}>
                                    <span>{mailJSON?.mId}</span>
                                    <span>{mailJSON?.subject}</span>
                                </div>
                            </div>
                            {(selectedFolder !== FOLDER_TYPES.DELETED) && <FontAwesomeIcon size="sm" icon={faTrashAlt} className={classes.deleteIconStyles} onClick={deleteClickHandler.bind(null, mailJSON?.mId)}></FontAwesomeIcon>}
                        </header>
                        <hr />

                        <main>
                            <div dangerouslySetInnerHTML={{ __html: mailJSON.content }} className={classes.dangerousDiv}></div>
                        </main>
                    </div>
                )
            }
        }
        return null;
    }, [getMailData, selectedID, mailJSON, selectedFolder, deleteClickHandler, getFilteredData, flagFilter])

    return (
        <div className={classes.wrapper}>
            {mailContent}
        </div>
    )
})

export default MailBody;