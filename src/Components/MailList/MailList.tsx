import React, { useContext, useCallback, useState } from 'react';
import classes from './MailList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { MailContext } from './../../Store/MailContext';
import { faTrashAlt, faEnvelope, faEnvelopeOpen, faFlag, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import noMail from './../../Assets/Images/nomail.svg';
import { FOLDER_TYPES } from './../../Utils/models';

// MAIL LIST : LISTS ALL THE MAILS BASED ON SELECTION FROM FOLDERS
const MailList: React.FC = observer(props => {

    // FETCHING DATA FROM STORE
    const mailData = useContext(MailContext);
    const { setID, deleteTheMail, selectedFolder, readTheMail, selectedID, setFlags, flagIds, flagFilter, toggleFlagFilter, getMailData, getFilteredData } = mailData;

    // DROPDOWN STATE
    const [dropDownState, setDropDownState] = useState<boolean>(false);

    // MAIL CLICK HANDLER TO DISPLAY DATA ON RHS
    const mailOnClickHandler = useCallback((mID: string) => {
        setID(mID);
        readTheMail(mID);
    }, [setID, readTheMail])

    // DELETE CLICK HANDLER
    const deleteClickHandler = useCallback((mId: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        deleteTheMail(mId);
    }, [deleteTheMail])

    // ENVELOPE ICONS CLICK HANDLER TO TOGGLE READ AND UNREAD STATES
    const envelopeClickHandler = useCallback((mId: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        readTheMail(mId, true);
    }, [readTheMail])

    // FLAG CLICK HANDLER - TO TOGGLE FLAG STATUS
    const flagClickHandler = useCallback((mId: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setFlags(mId);
    }, [setFlags])

    // TO OPEN THE DROPDOWN ON CLICK HANDLER  
    const onClickDropDown = useCallback(() => {
        setDropDownState(prevState => !prevState);
    }, [setDropDownState])

    // TO CLOSE THE DROPDOWN WHEN CLICKED ELSEWHERE
    const onBlurDropDown = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDropDownState(false);
    }, [setDropDownState])

    // TO START THE FILTERING
    const toggleOnFilterHandler = useCallback(() => {
        toggleFlagFilter(true);
        setDropDownState(false);
    }, [toggleFlagFilter])

    // TO STOP THE FILTERING
    const toggleOffFilterHandler = useCallback(() => {
        toggleFlagFilter(false);
        setDropDownState(false);
    }, [toggleFlagFilter, setDropDownState])

    // GENERATING THE MAIL LIST - CHANGES BASED ON GENERAL OR FILTERED
    const generateMailList = useCallback((): JSX.Element[] => {
        return (
            (flagFilter ? getFilteredData : getMailData).map((el, index) => {
                return (
                    <li className={[el.unread ? classes.notVisited : "", selectedID === el.mId ? classes.selected : ""].join(" ")} onClick={mailOnClickHandler.bind(null, el.mId)}>
                        <div className={classes.iconTitleWrapper}>
                            <div className={classes.mId}>{el.mId}</div>
                            <span className={classes.iconWrapper}>
                                {(selectedFolder !== FOLDER_TYPES.DELETED) && <FontAwesomeIcon icon={faTrashAlt} size="sm" className={[classes.iconStyles, classes.iconDeleteStyles].join(" ")} onClick={deleteClickHandler.bind(null, el.mId)}></FontAwesomeIcon>}
                                <FontAwesomeIcon icon={el.unread ? faEnvelopeOpen : faEnvelope} size="sm" className={[classes.iconStyles, classes.iconEnvelopeStyles].join(" ")} onClick={envelopeClickHandler.bind(null, el.mId)}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faFlag} size="sm" className={[classes.iconStyles, flagIds.includes(el.mId) ? classes.iconFlagSelectedStyles : "", classes.iconFlagStyles].join(" ")} onClick={flagClickHandler.bind(null, el.mId)} ></FontAwesomeIcon>
                            </span>
                        </div>
                        <div className={[classes.subjectContent, el.unread && classes.notVisited].join(" ")}>{el.subject}</div>
                        <div className={classes.subjectContent}>{el.content.replace(/<.*?>/ig, "")}</div>
                    </li>
                )
            }))
    }, [getMailData, getFilteredData, flagFilter, mailOnClickHandler, deleteClickHandler, envelopeClickHandler, flagClickHandler, selectedFolder, selectedID, flagIds])

    // FALL BACK JSX WHEN NOTHING EXISTS
    const fallBackJSX = (): JSX.Element => {
        return (
            <div className={classes.fallBackStyles}>
                <img src={noMail} alt="nothing present here" />
                <span>Nothing in {mailData.selectedFolder.toLowerCase()}.</span>
                <span>Looks empty over here!</span>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <header>
                <span>
                    {mailData.selectedFolder}
                </span>
                {flagFilter ?
                    <span className={classes.flagSpan} onClick={toggleOffFilterHandler}>Flagged <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon> </span> :
                    <div onBlur={onBlurDropDown} onClick={onClickDropDown} tabIndex={1}>
                        <span>Filter <FontAwesomeIcon icon={faCaretDown} /></span>
                        <section style={{ display: dropDownState ? "block" : "none" }} onClick={(e: any) => { e.stopPropagation() }}>
                            <span onClick={toggleOnFilterHandler}>Flag</span>
                        </section>
                    </div>}
            </header>
            <main>
                <ul>
                    {generateMailList().length ? generateMailList() : fallBackJSX()}
                </ul>
            </main>
        </div>
    )
})

export default MailList;