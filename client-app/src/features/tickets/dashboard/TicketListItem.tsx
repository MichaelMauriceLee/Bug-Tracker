import React from 'react'
import { ITicket } from '../../../app/models/ticket';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const TicketListItem: React.FC<{ticket: ITicket}> = ({ ticket }) => {
    return (
        <Segment.Group>
            <Segment>
            <Item.Group>
            <Item>
                <Item.Content>
                  <Item.Header as='a'>{ticket.title}</Item.Header>
                  <Item.Description>
                        <p><strong>Submitted by: </strong>{ticket.submitterUsername && ticket.submitterUsername.charAt(0).toUpperCase() +
                         ticket.submitterUsername.slice(1)}</p>
                        <p><strong>Assigned to: </strong>{ticket.assigneeUsername && 
                        ticket.assigneeUsername.charAt(0).toUpperCase() + ticket.assigneeUsername.slice(1)}</p>
                  </Item.Description>
                </Item.Content>
                </Item>
            </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock'/>  
                    {format(ticket.submissionDate, 'MMMM d y')} at{" "}
                    {format(ticket.submissionDate, 'h:mm a')}
            </Segment>
            <Segment clearing>
                <span>{ticket.description}</span>
                <Button
                    as={Link} to={`/tickets/${ticket.id}`}
                    floated = "right" 
                    content = "View" 
                    color = "blue"
                />
            </Segment>
        </Segment.Group>
    )
}


export default TicketListItem;
