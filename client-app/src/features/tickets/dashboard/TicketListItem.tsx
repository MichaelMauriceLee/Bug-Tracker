import React from 'react'
import { ITicket } from '../../../app/models/ticket';
import { Item, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



const TicketListItem: React.FC<{ticket: ITicket}> = ({ticket}) => {
    return (
        <Item key = {ticket.id}>
        <Item.Content>
          <Item.Header as='a'>{ticket.title}</Item.Header>
          <Item.Meta>{ticket.submissionDate}</Item.Meta>
          <Item.Description>
              <div>{ticket.description}</div>
          </Item.Description>
          <Item.Extra>
              <Button
                 as={Link} to={`/activities/${ticket.id}`}
                floated = "right" 
                content = "View" 
                color = "blue"
                />
              <Label basic content = {ticket.category} color = "blue"/>
          </Item.Extra>
        </Item.Content>
        </Item>
    )
}


export default TicketListItem;
