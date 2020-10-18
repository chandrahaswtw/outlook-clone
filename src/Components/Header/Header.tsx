import React from 'react';
import classes from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

// MAIN HEADER
const Header: React.FC = props => {
    return (
        <nav className={classes.wrapper}>
            <FontAwesomeIcon icon={faWindows} className={classes.iconStyles} size="lg"></FontAwesomeIcon>
            <span className={classes.titleStyles}>OUTLOOK CLONE</span>
        </nav>
    )
}

export default Header;