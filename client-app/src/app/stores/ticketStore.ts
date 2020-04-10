import {RootStore} from "./rootStore";
import {configure, observable, runInAction, action, computed, reaction} from "mobx";
import { ITicket } from '../models/ticket'
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

configure({enforceActions: "always"});


export default class TicketStore {

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.ticketRegistry.clear();
                this.loadTickets();
            }
        )
    }

    @observable ticketRegistry = new Map();
    @observable ticket: ITicket | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable.ref hubConnection: HubConnection | null = null;
    @observable ticketCount = 0;
    @observable predicate = new Map();

    @action setPredicate = (predicate: string, value: string) =>{
        this.predicate.clear();
        if (predicate !== 'all'){
            this.predicate.set(predicate, value);
        }
    }

    @computed get axiosParams() {
        const params = new URLSearchParams();
        this.predicate.forEach((value, key) => {
                params.append(key, value)
        })
        return params;
    }

    @action createHubConnection = (ticketId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
        .start()
        .then(() => console.log(this.hubConnection!.state))
        .then(() => {
            console.log('Attempting to join group');
            if(this.hubConnection!.state === 'Connected'){
            this.hubConnection!.invoke('AddToGroup', ticketId)
            }
        })
        .catch(
            error => console.log('Error establishing connection: ', error));
        
        this.hubConnection.on('ReceiveComment', comment => {
            runInAction(() =>{
                this.ticket!.comments.push(comment);
            })
        })

    };

    @action stopHubConnection = () => {
        this.hubConnection!.invoke('RemoveFromGroup', this.ticket!.id)
            .then(() => {
                this.hubConnection!.stop()
            })
            .then(() => console.log('Connection stopped'))
            .catch(err => console.log(err))
    }

    @action addComment = async (values: any) => {
        values.ticketId = this.ticket!.id;
        try{
            await this.hubConnection!.invoke("SendComment", values)
        }catch(error){
            console.log(error)
        }
    }

    @computed get ticketsByDate() {
        return this.groupTicketsByCategory(Array.from(this.ticketRegistry.values()))
    }

    groupTicketsByCategory(tickets: ITicket[]) {
        const sortedTickets = tickets.sort(
            (a, b) => b.submissionDate.getTime() - a.submissionDate.getTime()
        )
        return Object.entries(sortedTickets.reduce((tickets, ticket) => {
            const category = ticket.category;
            tickets[category] = tickets[category] ? [...tickets[category], ticket] : [ticket];
            return tickets;
        }, {} as {[key: string]: ITicket[]}));
    }


    @action loadTickets = async () => {
        this.loadingInitial = true;
        try{
            const ticketsEnvelope = await agent.Tickets.list(this.axiosParams);
            const {tickets, ticketCount} = ticketsEnvelope;
            runInAction('loading tickets', () => {
                tickets.forEach((ticket) => {
                    ticket.submissionDate = new Date (ticket.submissionDate);
                    this.ticketRegistry.set(ticket.id, ticket);
                });
                this.ticketCount = ticketCount;
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
            ticket.comments = [];
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
        this.submitting = true;
        try{
            await agent.Tickets.assign(ticket);
            runInAction('assigning ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.ticket = ticket;
                this.submitting = false;
            })
            history.push('/tickets/');
            //history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('assign ticket error', () => {
                this.submitting = false;
            })
            toast.error("Problem assigning the ticket");
            console.log(error.response);
        }
    }

    @action removeTicket = async (ticket: ITicket) => {
        this.submitting = true;
        try{
            await agent.Tickets.remove(ticket);
            runInAction('dropping ticket', () => {
                this.ticketRegistry.set(ticket.id, ticket);
                this.ticket = ticket;
                this.submitting = false;
            })
            history.push('/tickets/');
            //history.push(`/tickets/${ticket.id}`);
        } catch(error) {
            runInAction('dropping ticket error', () => {
                this.submitting = false;
            })
            toast.error("Problem dropping the ticket");
            console.log(error.response);
        }
    }

    @action deleteTicket = async (id:string) => {
        this.submitting = true;
        try{
            await agent.Tickets.delete(id);
            runInAction('deleting ticket', () => {
                this.ticketRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
            history.push('/tickets/');
        } catch(error) {
            runInAction('delete ticket error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    }
    
}

