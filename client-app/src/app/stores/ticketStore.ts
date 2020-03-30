import {RootStore} from "./rootStore";
import {configure, observable, runInAction, action, computed} from "mobx";
import { SyntheticEvent } from "react";
import { ITicket } from '../models/ticket'
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";

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
        return this.groupTicketsByCategory(Array.from(this.ticketRegistry.values()))
    }

    groupTicketsByCategory(tickets: ITicket[]) {
        const sortedTickets = tickets.sort(
            (a, b) => b.submissionDate.getTime() - a.submissionDate.getTime()
        )
        return Object.entries(sortedTickets.reduce((tickets, ticket) => {
            const date = ticket.submissionDate.toISOString().split('T')[0];
            const category = ticket.category;
            tickets[category] = tickets[category] ? [...tickets[category], ticket] : [ticket];
            return tickets;
        }, {} as {[key: string]: ITicket[]}));
    }


    @action loadTickets = async () => {
        this.loadingInitial = true;
        try{
            const tickets = await agent.Tickets.list();
            runInAction('loading tickets', () => {
                tickets.forEach((ticket) => {
                    ticket.submissionDate = new Date (ticket.submissionDate);
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
            return ticket;
        } else{
            this.loadingInitial = true;
            try{
                ticket = await agent.Tickets.details(id);
                runInAction('getting ticket', ()=>{
                    ticket.submissionDate = new Date(ticket.submissionDate);
                    this.ticket = ticket;
                    this.ticketRegistry.set(ticket.id, ticket);
                    this.loadingInitial = false;
                })
                return ticket;
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
            history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('create ticket error', () => {
                this.submitting = false;
            })
            toast.error("Problem submitting data");
            console.log(error.response);
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
            history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('edit ticket error', () => {
                this.submitting = false;
            })
            toast.error("Problem submitting data");
            console.log(error.response);
        }
    }

    @action assignTicket = async (ticket: ITicket) => {
        this.loadingInitial = true;
        try{
            await agent.Tickets.assign(ticket);
            runInAction('assigning ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.ticket = ticket;
                this.loadingInitial = false;
            })
            history.push('/tickets/');
            //history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('assign ticket error', () => {
                this.loadingInitial = false;
            })
            toast.error("Problem submitting data");
            console.log(error.response);
        }
    }

    @action removeTicket = async (ticket: ITicket) => {
        this.loadingInitial = true;
        try{
            await agent.Tickets.remove(ticket);
            runInAction('dropping ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.ticket = ticket;
                this.loadingInitial = false;
            })
            history.push('/tickets/');
            //history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('dropping ticket error', () => {
                this.loadingInitial = false;
            })
            toast.error("Problem submitting data");
            console.log(error.response);
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

