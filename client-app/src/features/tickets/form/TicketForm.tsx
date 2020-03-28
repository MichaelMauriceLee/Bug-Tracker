import React, { useContext, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {v4 as uuid} from 'uuid';
import { RootStoreContext } from '../../../app/stores/rootStore'
import { TicketFormValues } from '../../../app/models/ticket';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { ticketCategory } from '../../../app/common/options/ticketCategoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineTicketDateAndTime } from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';


const validate = combineValidators({
    title: isRequired({message: "The Ticket Title is required"}),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: "Description needs to be at least 5 parameters"})
    )(),
    category: isRequired('Category'),
    submissionDate: isRequired("Submission Date"),
    time: isRequired("Time")
})


interface DetailParams {
    id: string
}


const TicketForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const rootStore = useContext(RootStoreContext);
    const {
        createTicket,
        editTicket,
        submitting,
        loadTicket,
    } = rootStore.ticketStore;

    const [ticket, setTicket] = useState(new TicketFormValues());
    const [loading, setLoading] = useState(false);   //local state for the loading

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadTicket(match.params.id).then(
                (ticket) =>  setTicket(new TicketFormValues(ticket))
            ).finally(()=> setLoading(false));
        }
    }, [loadTicket, match.params.id]);


    const handleFinalFormSubmit = (values: any) => {
        const dateAndTime = combineTicketDateAndTime(values.submissionDate, values.time);
        const{submissionDate, time, ...ticket} = values;
        ticket.submissionDate = dateAndTime;
        if (!ticket.id){
            let newTicket = {
                ...ticket,
                id: uuid()    //this creates a guid for our new ticket
            }
            createTicket(newTicket);
        }else {
            editTicket(ticket);
        }
    }

    return (
        <Grid>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={10}>
            <Segment clearing>
                <FinalForm 
                validate = {validate}
                    initialValues = {ticket}
                    onSubmit = {handleFinalFormSubmit}
                    render = {({handleSubmit, invalid, pristine}) => (
                        <Form onSubmit = {handleSubmit} loading = {loading}>
                            <Field
                                name='title'
                                placeholder = "Title"
                                value = {ticket.title}
                                component = {TextInput}
                            />
                            <Field
                                name='description'
                                placeholder = "Description" 
                                value = {ticket.description}
                                component = {TextAreaInput}
                            />
                            <Field
                                component = {SelectInput}
                                options = {ticketCategory}
                                name='category' 
                                placeholder = "Category" 
                                value = {ticket.category}
                            />
                            <Form.Group widths = 'equal'>
                            <Field
                                component = {DateInput}
                                name='submissionDate' 
                                date = {true}
                                placeholder = "Submission Date" 
                                value = {ticket.submissionDate}
                            />
                             <Field
                                component = {DateInput}
                                name='time'
                                time = {true} 
                                placeholder = "Time" 
                                value = {ticket.time}
                            />
                            </Form.Group>
                            <Button 
                            loading={submitting}
                            disabled = {loading || invalid || pristine}
                             floated='right'
                             positive 
                             type = 'submit' 
                             content = "Submit" 
                             />
                            <Button 
                            onClick={ticket.id ? () => history.push(`/tickets/${ticket.id}`) : () => history.push('/tickets')}
                            disabled = {loading}
                            floated='right' 
                            type = 'button' 
                            content = "Cancel" 
                            />
                        </Form>
                    )}
                />
            </Segment>
            </Grid.Column>
        </Grid>
    )
}


export default observer(TicketForm);