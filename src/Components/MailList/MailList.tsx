import React, { useContext,useCallback } from 'react';
import classes from './MailList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { MailContext } from './../../Store/MailContext';
import { faTrashAlt, faEnvelope, faEnvelopeOpen, faFlag } from '@fortawesome/free-solid-svg-icons'

const MailList: React.FC = observer(props => {

    const mailData = useContext(MailContext);

    console.log(mailData.selectedID);

    const mailOnClickHandler = useCallback((mID : string) =>{
        mailData.selectedID = mID;
    },[mailData])

    const generateMailList = useCallback(() : JSX.Element => {
        return (<ul>
            {mailData.getMailData.map((el, index) => {
                return (
                    <li className={el.unread ? classes.notVisited : ""} onClick={mailOnClickHandler.bind(null, el.mId)}>
                        <div className={classes.iconTitleWrapper}>
                            <div className={classes.mId}>{el.mId}</div>
                            <span className={classes.iconWrapper}>
                                <FontAwesomeIcon icon={faTrashAlt} size="sm" className={classes.iconStyles}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={el.unread ? faEnvelopeOpen : faEnvelope} size="sm" className={classes.iconStyles}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faFlag} size="sm" className={classes.iconStyles}></FontAwesomeIcon>
                            </span>
                        </div>
                        <div className={[classes.subjectContent, el.unread && classes.notVisited].join(" ")}>{el.subject}</div>
                        <div className={classes.subjectContent}>{el.content.replace(/<.*?>/, "")}</div>
                    </li>
                )
            })}
        </ul>)
    },[mailData, mailOnClickHandler])


    return (
        <div className={classes.wrapper}>
            <header>
                <span>
                    {mailData.selectedFolder}
                </span>
                <span>
                    Filter <FontAwesomeIcon icon={faCaretDown} />
                </span>
            </header>
            <main>{generateMailList()}</main>
        </div>
    )
})

export default MailList;