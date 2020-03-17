import React, { useContext, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Segment, Item, Label } from 'semantic-ui-react';
import TicketListItem from './TicketListItem';

const TicketList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { ticketsByDate } = rootStore.ticketStore;


    return (
        <Fragment>
            {ticketsByDate.map(([group, tickets]) => (
                <Fragment key = {group}>
                <Label size='large' color = 'blue'>
                    {group}
                </Label>
                <Segment clearing>
                    <Item.Group divided>
                        {tickets.map(ticket => (
                            <TicketListItem key = {ticket.id} ticket = {ticket} />
                        ))}
                    </Item.Group>
                </Segment>
                </Fragment>
            ))}
        </Fragment>
    )
}


export default observer(TicketList);
