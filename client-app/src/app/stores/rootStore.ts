import UserStore from './userStore';
import {createContext} from 'react';
import {configure} from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import TeamStore from './teamStore';
import TicketStore from './ticketStore';
import StatisticsStore from './statisticsStore';

/*
 * Store that contains all other stores
 */

configure({enforceActions: 'always'});

export class RootStore {
    teamStore: TeamStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    ticketStore: TicketStore;
    statisticsStore: StatisticsStore;

    constructor() {
        this.teamStore = new TeamStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.ticketStore = new TicketStore(this);
        this.statisticsStore = new StatisticsStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());