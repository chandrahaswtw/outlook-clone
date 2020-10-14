import {createContext} from "react";
import {MailStore} from './../Store/MailStore';

export const MailContext = createContext<MailStore>({} as MailStore);
