import React, { useContext, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Segment, Item } from 'semantic-ui-react';
import TicketListItem from './TicketListItem';

const TicketList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { ticketsByDate } = rootStore.ticketStore;


    return (
        
                <Segment>
                    <Item.Group divided>
                        {ticketsByDate.map(ticket => (
                            <TicketListItem key = {ticket.id} ticket = {ticket} />
                        ))}
                    </Item.Group>
                </Segment>
        
    )
}


export default observer(TicketList);
