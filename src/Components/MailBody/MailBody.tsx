import React, { useMemo } from 'react';
import classes from './MailBody.module.scss';
import envelope from './../../Assets/Images/envelope.svg'

const MailBody: React.FC = props => {

    const noMailContent = useMemo(() => {
        return (
            <section className={classes.noMailContentWrapper}>
                <img src={envelope} alt="no img" />
                <div>Select an item to read</div>
                <div>Nothing is selected !</div>
            </section>
        )
    },[])

    return (
        <div className={classes.wrapper}>
            {noMailContent}
        </div>
    )
}

export default MailBody;