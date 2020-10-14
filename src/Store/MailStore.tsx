import { observable, action, makeObservable } from 'mobx';

export class MailStore {

    constructor() {
        makeObservable(this)
    }

    @observable name: string = "CHAN";

    @action
    setName = (param: string) => {
        this.name = param
    }
}