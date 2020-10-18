import React, { useState, useCallback, useContext, useMemo } from 'react';
import classes from './Folders.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faInbox, faBan, faFolder, faExternalLinkAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { MailContext } from './../../Store/MailContext';
import Badge from './../../UI/Badge/Badge';
import { FOLDER_TYPES } from './../../Utils/models';

// FOLDERS DISPLAY - LHS
const Folders: React.FC = observer(props => {

    // FETCHING DATA FROM STORE
    const mailData = useContext(MailContext);
    const unreadCount = mailData.getUnreadCount;
    const { setFolder, selectedFolder } = mailData;

    // STATE FOR OPENING THE CARAT - FOLDER COLLAPSIBLE
    const [contentOpen, setContentOpen] = useState<boolean>(true);

    // FOLDER TOGGLE HANDLER
    const caratClickHandler = useCallback(() => {
        setContentOpen((prevState) => {
            return !prevState
        })
    }, [setContentOpen])

    // CREATING THE FOLDER NAME AND UNREAD COUNT JSX 
    const folderJSX = useMemo(() => {
        return Object.keys(FOLDER_TYPES).map((el, index) => {
            let type = FOLDER_TYPES[el as keyof typeof FOLDER_TYPES];
            let icon = null;
            switch (type) {
                case FOLDER_TYPES.INBOX:
                    icon = faInbox;
                    break;
                case FOLDER_TYPES.SPAM:
                    icon = faBan;
                    break;
                case FOLDER_TYPES.DELETED:
                    icon = faTrashAlt;
                    break;
                case FOLDER_TYPES.OTHER:
                    icon = faFolder
                    break;
                default:
                    icon = faInbox;
                    break;
            }
            return (
                <li onClick={() => { setFolder(type) }} className={selectedFolder === type ? classes.visited : ""}>
                    <span><FontAwesomeIcon icon={icon} className={classes.innerIconStyles} /> {type} </span>
                    {unreadCount[index] > 0 && <Badge>{unreadCount[index]}</Badge>}
                </li>
            )
        })
    }, [unreadCount, selectedFolder, setFolder])

    return (
        <div className={classes.wrapper}>
            <nav className={classes.navigationSection}>
                <div className={classes.categorySection} onClick={caratClickHandler}>
                    <FontAwesomeIcon icon={faCaretRight} className={[classes.iconStyles, contentOpen && classes.iconRotated].join(" ")} size="lg" />
                    FOLDERS
                </div>
                {contentOpen && <ul>
                    {folderJSX}
                </ul >}
            </nav >
            <footer className={classes.footer}>
                DESIGNED & DEVELOPED BY <a href="https://chandrahasballeda.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faExternalLinkAlt} className={classes.innerIconStyles} /> CHANDRAHAS BALLEDA</a>
            </footer>
        </div >
    )
})

export default Folders;