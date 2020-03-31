import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Grid } from 'semantic-ui-react';
import TicketDetailedHeader from './TicketDetailedHeader';
import TicketDetailedInfo from './TicketDetailedInfo';
import TicketComments from './TicketComments';


interface DetailParams {
    id: string
}

const TicketDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        ticket, 
        loadTicket,
        loadingInitial
    } = rootStore.ticketStore;

    useEffect(() => {
        loadTicket(match.params.id);
    }, [loadTicket, match.params.id, history])

    if(loadingInitial) return <LoadingComponent content = "loading ticket..." />;

    if(!ticket){
      return <h2>Ticket not found</h2>
    }


    return (
      <Grid>
        <Grid.Column width = {2}>
        </Grid.Column>
        <Grid.Column width = {14}>
          <TicketDetailedHeader ticket={ticket}/>
          <TicketDetailedInfo ticket = {ticket}/>
          <TicketComments />
        </Grid.Column>
      </Grid>
    )

};



export default observer(TicketDetails);