import React, { useContext, useEffect } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Card, Button } from 'semantic-ui-react';


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
        loadTicket(match.params.id)
    }, [loadTicket, match.params.id])

    if(loadingInitial || !ticket) return <LoadingComponent content = "loading ticket..." />

    return (
        <Card fluid>
        <Card.Content>
          <Card.Header>{ticket!.title}</Card.Header>
          <Card.Meta>
            <span>{ticket!.submissionDate}</span>
          </Card.Meta>
          <Card.Description>
            {ticket!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths = {2}>
                <Button as={Link} to={`/manageTicket/${ticket.id}`} basic color="blue" content = "Edit"/>
                <Button onClick={() => history.push('/tickets')} basic color="grey" content = "Cancel"/>
            </Button.Group>
        </Card.Content>
      </Card>
    )
};



export default observer(TicketDetails);