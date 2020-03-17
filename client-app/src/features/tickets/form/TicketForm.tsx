import React, { useContext, useState, useEffect, FormEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {v4 as uuid} from 'uuid';
import { RootStoreContext } from '../../../app/stores/rootStore'
import { ITicket } from '../../../app/models/ticket';
import { Segment, Form, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';


interface DetailParams {
    id: string
}


const TicketForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const rootStore = useContext(RootStoreContext);
    const {
        createTicket,
        editTicket,
        submitting,
        ticket: initialFormState,
        loadTicket,
        clearTicket
    } = rootStore.ticketStore;

    const [ticket, setTicket] = useState<ITicket>({
        id: '',
        title: '',
        description: '',
        category: '',
        submissionDate: ''
    })


    useEffect(() => {
        if (match.params.id && ticket.id.length === 0) {
            loadTicket(match.params.id).then(
                () => initialFormState && setTicket(initialFormState)
                );
        }
        return  () => {
            clearTicket();
        }
    }, [loadTicket, clearTicket, match.params.id, initialFormState, ticket.id.length]);

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {   //event that we get from our onchange handler
        const {name, value} = event.currentTarget;
        setTicket({...ticket, [name]: value})
    }

    const handleSubmit = () => {
        if (ticket.id.length === 0){
            let newTicket = {
                ...ticket,
                id: uuid()    //this creates a guid for our new ticket
            }
            createTicket(newTicket).then(() => history.push(`/tickets/${newTicket.id}`));
        }else {
            editTicket(ticket).then(() => history.push(`/tickets/${ticket.id}`));
        }
    }

    return (
        <div>
            <Segment clearing>
                <Form onSubmit = {handleSubmit}>
                    <Form.Input
                        onChange={handleInputChange}
                        name='title'
                        placeholder = "Title"
                        value = {ticket.title}
                    />
                    <Form.TextArea 
                        onChange={handleInputChange}
                        name='description'
                        rows={2}
                        placeholder = "Description" 
                        value = {ticket.description}
                     />
                    <Form.Input
                        onChange={handleInputChange}
                        name='category' 
                        placeholder = "Category" 
                        value = {ticket.category}
                    />
                    <Form.Input
                        onChange={handleInputChange}
                        name='submissionDate' 
                        type='datetime-local' 
                        placeholder = "submissionDate" 
                        value = {ticket.submissionDate}
                    />
                    <Button loading={submitting} floated='right' positive type = 'submit' content = "Submit" />
                    <Button 
                    onClick={() => history.push('/tickets')}
                    floated='right' 
                    type = 'button' 
                    content = "Cancel" />
                </Form>
            </Segment>
        </div>
    )
}


export default observer(TicketForm);