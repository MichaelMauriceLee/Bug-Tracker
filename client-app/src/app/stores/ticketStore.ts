import {RootStore} from "./rootStore";
import {reaction, configure, observable, runInAction, action, computed} from "mobx";
import { createContext, SyntheticEvent } from "react";
import { ITicket } from '../models/ticket'
import agent from "../api/agent";
import { isThursdayWithOptions } from "date-fns/fp";

configure({enforceActions: "always"});


export default class TicketStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable ticketRegistry = new Map();
    @observable ticket: ITicket | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    @computed get ticketsByDate() {
        return Array.from(this.ticketRegistry.values())
    }


    @action loadTickets = async () => {
        this.loadingInitial = true;
        try{
            const tickets = await agent.Tickets.list();
            runInAction('loading tickets', () => {
                tickets.forEach((ticket) => {
                    this.ticketRegistry.set(ticket.id, ticket);
                });
                this.loadingInitial = false;
            });
        }catch(error){
            runInAction('load tickets error', ()=> {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }


    @action loadTicket = async (id: string) => {
        let ticket = this.getTicket(id);
        if(ticket) {
            this.ticket = ticket;
        } else{
            this.loadingInitial = true;
            try{
                ticket = await agent.Tickets.details(id);
                runInAction('getting ticket', ()=>{
                    this.ticket = ticket;
                    this.loadingInitial = false;
                })
            } catch(error){
                runInAction('get ticket error', () => {
                    this.loadingInitial = false;
                })
                console.log(error);
            }
        }
    }

    @action clearTicket = () => {
        this.ticket = null;
    }

    getTicket = (id: string) => {
        return this.ticketRegistry.get(id);
    }

    @action createTicket = async (ticket: ITicket) => {
        this.submitting = true;

        try{
            await agent.Tickets.create(ticket);
            runInAction('creating ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.submitting = false;
            });
        } catch(error) {
            runInAction('create ticket error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action editTicket = async (ticket: ITicket) => {
        this.submitting = true;
        try{
            await agent.Tickets.update(ticket);
            runInAction('editing ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.ticket = ticket;
                this.submitting = false;
            })
        } catch(error) {
            runInAction('edit ticket error', () => {
                this.submitting = false;
            })
            console.log(error);
        }
    }

    @action deleteTicket = async (event: SyntheticEvent<HTMLButtonElement>, id:string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try{
            await agent.Tickets.delete(id);
            runInAction('deleting ticket', () => {
                this.ticketRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch(error) {
            runInAction('delete ticket error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    }
    
}

