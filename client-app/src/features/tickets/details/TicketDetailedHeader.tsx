import React, { useContext, useEffect, useState } from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { ITicket } from '../../../app/models/ticket';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ticketImageStyle = {
  filter: 'brightness(30%)',
  width: "100%",
  height: "25rem"
};

const ticketImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};



const TicketDetailedHeader: React.FC<{ticket: ITicket}> = ({ ticket }) => {

    const rootStore = useContext(RootStoreContext);
      const {
          user,
          getUser,
          loading
    } = rootStore.userStore;
    
    useEffect(() => {
      getUser();
    }, [getUser])
    
    if(loading) return <LoadingComponent content = "loading..." />;
    
    if(!user){
      return <h2>Unable to get user info</h2>
    }


  const { 
      assignTicket,
      removeTicket,
  } = rootStore.ticketStore;


  var assignOrDropButton;

    if(ticket.assigneeUsername)
        assignOrDropButton = "Drop Ticket";
    else
        assignOrDropButton = "Pickup Ticket";


    const handleAssignOrDrop = () => {
      if (ticket.assigneeUsername){
        removeTicket(ticket);
        assignOrDropButton = "Drop Ticket";
      }else {
        assignTicket(ticket);
        assignOrDropButton = "Pickup Ticket";
      }
  }

    return (
            <Segment.Group>
              <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={'/assets/categoryImages/SoftwareBug.jpg'} fluid style={ticketImageStyle}/>
                <Segment basic style={ticketImageTextStyle}>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size='huge'
                          content={ticket.title}
                          style={{ color: 'white' }}
                        />
                        <p>{format(ticket.submissionDate, 'eeee do MMMM')}</p>
                        <p>
                          Submitted by <strong>{ticket.submitterUsername && ticket.submitterUsername.charAt(0).toUpperCase() +
                         ticket.submitterUsername.slice(1)}</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>

                {ticket.assigneeUsername ? (ticket.assigneeUsername === user.username && 
                  <Button 
                      onClick = {handleAssignOrDrop} 
                      color='teal'>{assignOrDropButton}</Button>) : 
                  <Button 
                      onClick = {handleAssignOrDrop} 
                      color='teal'>{assignOrDropButton}</Button>}
                
                {(ticket.submitterUsername === user.username || ticket.assigneeUsername === user.username) && 
                <Button as={Link} to={`/manageTicket/${ticket.id}`} color='orange' floated='right'>
                  Manage Ticket
                </Button>}

              </Segment>
            </Segment.Group>
    )
}


export default observer(TicketDetailedHeader);