import {RootStore} from "./rootStore";
import {reaction} from "mobx";

export default class TicketStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    //TODO
}
