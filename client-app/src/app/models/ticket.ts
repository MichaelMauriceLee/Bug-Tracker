/*
TODO
 */
// The following is a typescript interface
// When we want to define the structure of an object and we want to strongly type against this particular object
//Then interfaces are the way to go (it is solely used for type checking!)

export interface ITicketsEnvelope{
    tickets: ITicket[];
    ticketCount: number;
}



export interface ITicket {  //This is the strucure of our Ticket object at the moment
    id: string;
    title: string;
    description: string;
    category: string;
    submissionDate: Date;
    submitterId: string;
    submitterUsername: string;
    teamId: string;
    teamName: string;
    assigneeId: string | null;
    assigneeUsername: string | null;
    comments: IComment[];
}

export interface IComment{
    id: string;
    createdAt: Date;
    body: string;
    username: string;
    displayName: string;
    image: string;
}


export interface ITicketFormValues extends Partial<ITicket>{
    time?: Date
}


export class TicketFormValues implements ITicketFormValues {
    id?: string = "";
    title: string = "";
    description: string = "";
    category: string = "";
    submissionDate?: Date = undefined;
    submitterId: string = "";
    teamId: string = "";
    time?: Date = undefined;

    constructor(init?: ITicketFormValues) {
        if (init && init.submissionDate) {
            init.time = init.submissionDate
        }
        Object.assign(this, init);
    }
}