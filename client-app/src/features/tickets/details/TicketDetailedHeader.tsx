import React, { useContext, useEffect, useState } from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { ITicket } from '../../../app/models/ticket';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { TheTeam } from '../../../app/models/team';

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

    const {loadTeam, loadingInitial} = rootStore.teamStore;

  //See Ticket form and try to create a new local team so we can avoid the if statements for null below
    const [team, setTeam] = useState(new TheTeam());
    const [loadingLocal, setLoading] = useState(false);   //local state for the loading

    useEffect(() => {
        if(ticket.teamId){
          setLoading(true);
          loadTeam(ticket.teamId).then(
            (team) => setTeam(new TheTeam(team))
          ).finally(() => setLoading(false));
        }
        
    }, [loadTeam, ticket.teamId]);

    //if (loadingInitial) return <LoadingComponent content='Loading team...'/>;

    //if (!team) return <h2>Team not found</h2>;
    // console.log(team.name)

    
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

    var managerUserName;
    var isOnTeam = false;
    const manager = team.members.filter(x => x.isManager)[0];
    const teamMember = team.members.filter(x => x.username === user.username)[0];
    if(teamMember!=undefined){
      isOnTeam = true;
    }
    if(manager != undefined){
      managerUserName = manager.username;
    }

  const { 
      assignTicket,
      removeTicket,
      deleteTicket
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
                        <p>
                          Assigned to <strong>{ticket.assigneeUsername && ticket.assigneeUsername.charAt(0).toUpperCase() +
                         ticket.assigneeUsername.slice(1)}</strong>
                        </p>
                        <p>
                          Team in charge: <strong>{team && team.name}</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
              <Segment clearing attached='bottom'>

                {ticket.assigneeUsername ? ((ticket.assigneeUsername === user.username || user.username === managerUserName) &&
                  <Button 
                      onClick = {handleAssignOrDrop} 
                      color='teal'>{assignOrDropButton}</Button>) : (isOnTeam &&
                  <Button 
                      onClick = {handleAssignOrDrop} 
                      color='teal'>{assignOrDropButton}</Button>)}

                {managerUserName === user.username && 
                <Button as={Link} to={"/tickets"} onClick={()=>deleteTicket(ticket.id)} color='red' floated='right'>
                  Delete Ticket
                </Button>}

                {(ticket.submitterUsername === user.username || ticket.assigneeUsername === user.username 
                || managerUserName === user.username) && 
                <Button as={Link} to={`/manageTicket/${ticket.id}`} color='orange' floated='right'>
                  Edit Ticket Details
                </Button>}

              </Segment>
            </Segment.Group>
    )
}


export default observer(TicketDetailedHeader);