import React from 'react';
import classes from './Badge.module.scss';

const Badge: React.FC<React.PropsWithChildren<{}>> = props => {
    return <span className={classes.badgeStyles}>{props.children}</span>
}

export default Badge;