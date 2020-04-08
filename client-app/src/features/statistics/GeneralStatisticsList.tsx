import React, {useContext, Fragment} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import {Statistic} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

const GeneralStatisticsList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {statistics} = rootStore.statisticsStore;
    return (
        <Fragment>
            <Statistic.Group widths='three'>
                <Statistic>
                    <Statistic>
                        {statistics !== null && <Statistic.Value>{statistics.numTickets}</Statistic.Value>}
                        <Statistic.Label>Total Number of Tickets</Statistic.Label>
                    </Statistic>
                </Statistic>
                <Statistic>
                    <Statistic>
                        {statistics !== null && <Statistic.Value>{statistics.numTeams}</Statistic.Value>}
                        <Statistic.Label>Total Number of Teams</Statistic.Label>
                    </Statistic>
                </Statistic>
                <Statistic>
                    <Statistic>
                        {statistics !== null && <Statistic.Value>{statistics.numUsersWithBio}</Statistic.Value>}
                        <Statistic.Label>Number of Users with filled out bios</Statistic.Label>
                    </Statistic>
                </Statistic>
            </Statistic.Group>
            <Statistic.Group widths='three'>
                <Statistic>
                    <Statistic>
                        {statistics !== null && <Statistic.Value>{statistics.numUsersWithPhoto}</Statistic.Value>}
                        <Statistic.Label>Number of Users who uploaded photos</Statistic.Label>
                    </Statistic>
                </Statistic>
                <Statistic>
                    <Statistic>
                        {statistics !== null && <Statistic.Value>{statistics.numManagersWithBio}</Statistic.Value>}
                        <Statistic.Label>Number of Managers with filled out bios</Statistic.Label>
                    </Statistic>
                </Statistic>
                <Statistic>
                    {statistics !== null &&
                    <Statistic.Value>{statistics.numManagersWithPhoto}</Statistic.Value>}
                    <Statistic.Label>Number of Managers who uploaded photos</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </Fragment>
    );
};

export default observer(GeneralStatisticsList);