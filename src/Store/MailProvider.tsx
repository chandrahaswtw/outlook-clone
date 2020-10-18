import React from 'react';
import {MailStore} from './MailStore';
import {MailContext} from './MailContext';

export const MailProvider : React.FC<React.PropsWithChildren<{}>> = props => {
       return <MailContext.Provider value = {new MailStore()}>
            {props.children}
        </MailContext.Provider>
}
