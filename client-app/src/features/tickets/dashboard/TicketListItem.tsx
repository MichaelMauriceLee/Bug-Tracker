import React from 'react'
import { ITicket } from '../../../app/models/ticket';
import { Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';



const TicketListItem: React.FC<{ticket: ITicket}> = ({ ticket }) => {
    return (
        <Item key = {ticket.id}>
        <Item.Content>
          <Item.Header as='a'>{ticket.title}</Item.Header>
          <Item.Meta>{format(ticket.submissionDate, 'h:mm a')}</Item.Meta>
          <Item.Description>
              <div>{ticket.description}</div>
          </Item.Description>
          <Item.Extra>
              <Button
                 as={Link} to={`/tickets/${ticket.id}`}
                floated = "right" 
                content = "View" 
                color = "blue"
                />
          </Item.Extra>
        </Item.Content>
        </Item>
    )
}


export default TicketListItem;
