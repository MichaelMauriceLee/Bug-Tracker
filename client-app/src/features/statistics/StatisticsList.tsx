import React, {useContext, Fragment} from 'react';
import {RootStoreContext} from "../../app/stores/rootStore";
import {Grid, Statistic} from "semantic-ui-react";
import TeamListItem from "../teams/dashboard/TeamListItem";
import {observer} from "mobx-react-lite";
import {ITeam} from "../../app/models/team";
import { IStatistics } from '../../app/models/statistics';
import TeamListItemPlaceholder from "../teams/dashboard/TeamListItemPlaceholder";

const StatisticsList: React.FC  = () => {
    const rootStore = useContext(RootStoreContext);
    const {statistics} = rootStore.statisticsStore;
    return (
        <Fragment>
            <Statistic>
                {statistics !== null && <Statistic.Value>{statistics.numManagersWithBio}</Statistic.Value>}
                <Statistic.Label>Managers with filled out bios</Statistic.Label>
            </Statistic>
        </Fragment>
    );
};

export default observer(StatisticsList);