import React, { useState, useCallback } from 'react';
import classes from './Folders.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faInbox, faBan, faFolder, faExternalLinkAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Folders: React.FC = props => {

    const [contentOpen, setContentOpen] = useState<boolean>(true);

    const caratClickHandler = useCallback(() => {
        setContentOpen((prevState)=>{
            return !prevState
        })
    },[setContentOpen])

    return (
        <div className={classes.wrapper}>
            <nav className={classes.navigationSection}>
                <div className={classes.categorySection} onClick={caratClickHandler}>
                    <FontAwesomeIcon icon={faCaretRight} className={[classes.iconStyles, contentOpen && classes.iconRotated].join(" ")} size="lg"/>
                    FOLDERS
                </div>
                {contentOpen && <ul>
                    <li> <FontAwesomeIcon icon={faInbox} className={classes.innerIconStyles}/> INBOX</li>
                    <li> <FontAwesomeIcon icon={faBan} className={classes.innerIconStyles}/> SPAM</li>
                    <li> <FontAwesomeIcon icon={faTrashAlt} className={classes.innerIconStyles}/> DELETED ITEMS</li>
                    <li> <FontAwesomeIcon icon={faFolder} className={classes.innerIconStyles}/>OTHER FOLDER</li>
                </ul>}
            </nav>
            <footer className={classes.footer}>
                DESIGNED & DEVELOPED BY <a href="https://chandrahasballeda.com" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faExternalLinkAlt} className={classes.innerIconStyles}/> CHANDRAHAS BALLEDA</a> 
            </footer>
        </div>
    )
}

export default Folders;