/*
TODO
 */
// The following is a typescript interface
// When we want to define the structure of an object and we want to strongly type against this particular object
//Then interfaces are the way to go (it is solely used for type checking!)
export interface ITicket {  //This is the strucure of our Ticket object at the moment
    id: string;
    title: string;
    description: string;
    category: string;
    submissionDate: Date;
    submitterId: string;
    submitterUsername: string;
    assigneeId: string | null;
    assigneeUsername: string | null;
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
    time?: Date = undefined;

    constructor(init?: ITicketFormValues) {
        if (init && init.submissionDate) {
            init.time = init.submissionDate
        }
        Object.assign(this, init);
    }
}