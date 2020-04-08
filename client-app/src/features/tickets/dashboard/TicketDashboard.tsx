import React, { useContext, useEffect } from "react"
import { RootStoreContext } from "../../../app/stores/rootStore"
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TicketList from "./TicketList";
import { Link } from "react-router-dom";
import TicketFilters from "./TicketFilters";

/*
 * TODO
 */

const TicketDashboard = () => {

    const rootStore = useContext(RootStoreContext);

    useEffect(() => {
        rootStore.ticketStore.loadTickets();
    }, [rootStore.ticketStore])

    if (rootStore.ticketStore.loadingInitial) return <LoadingComponent content = 'Loading tickets...' />

    return (
        <Grid>
            <Grid.Column width = {10}>
                <TicketList />
            </Grid.Column>
            <Grid.Column width = {6}>
                <TicketFilters />
                <Button
                    as = {Link} to="/createTicket"
                    positive 
                    content = "Create Ticket"
                    />
            </Grid.Column>
        </Grid>
    )
}

export default observer(TicketDashboard);