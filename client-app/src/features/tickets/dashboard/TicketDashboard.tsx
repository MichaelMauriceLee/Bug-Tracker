import React, { useContext, useEffect } from "react"
import { RootStoreContext } from "../../../app/stores/rootStore"
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import TicketList from "./TicketList";
import { Link } from "react-router-dom";

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
            <Grid.Column width = {4}>
                <h2>Ticket Filters</h2> 
                <Button
                    as = {Link} to="/createTicket"
                    positive 
                    content = "Create Ticket"
                    />
            </Grid.Column>
            <Grid.Column width = {12}>
                <TicketList />
            </Grid.Column>
        </Grid>
    )
}

export default observer(TicketDashboard);