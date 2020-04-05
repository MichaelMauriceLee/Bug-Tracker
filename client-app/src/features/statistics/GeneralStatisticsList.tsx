import React, {useContext, Fragment} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import {Grid, Statistic, Header} from "semantic-ui-react";
import TeamListItem from "../teams/dashboard/TeamListItem";
import {observer} from "mobx-react-lite";
import {ITeam} from "../../app/models/team";
import {IStatistics} from '../../app/models/statistics';
import TeamListItemPlaceholder from "../teams/dashboard/TeamListItemPlaceholder";

const GeneralStatisticsList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {statistics} = rootStore.statisticsStore;
    return (

        <Fragment>
            <Header as='h2'>
                General Statistics
            </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null && <Statistic.Value>{statistics.numTickets}</Statistic.Value>}
                            <Statistic.Label>Total Number of Tickets</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null && <Statistic.Value>{statistics.numTeams}</Statistic.Value>}
                            <Statistic.Label>Total Number of Teams</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null && <Statistic.Value>{statistics.numUsersWithBio}</Statistic.Value>}
                            <Statistic.Label>Number of Users with filled out bios</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null && <Statistic.Value>{statistics.numUsersWithPhoto}</Statistic.Value>}
                            <Statistic.Label>Number of Users who uploaded photos</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null && <Statistic.Value>{statistics.numManagersWithBio}</Statistic.Value>}
                            <Statistic.Label>Number of Managers with filled out bios</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Statistic>
                            {statistics !== null &&
                            <Statistic.Value>{statistics.numManagersWithPhoto}</Statistic.Value>}
                            <Statistic.Label>Number of Managers with filled out bios</Statistic.Label>
                        </Statistic>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    );
};

export default observer(GeneralStatisticsList);