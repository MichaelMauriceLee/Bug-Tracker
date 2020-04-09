import React, {useContext, useEffect, Fragment} from "react"
import {observer} from "mobx-react-lite"
import {RootStoreContext} from "../../app/stores/rootStore";
import {Grid} from "semantic-ui-react";
import StatisticsHeader from "./StatisticsHeader";
import StatisticsPlaceholder from "./StatisticsPlaceholder";

const StatisticsDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadStatistics,
        loadingInitial,
    } = rootStore.statisticsStore;

    useEffect(() => {
        loadStatistics();
    }, [loadStatistics]);

    return (
        <Grid>
            <Grid.Column>
                {loadingInitial ? (
                    <StatisticsPlaceholder/>
                ) : (
                    <Fragment>
                        <StatisticsHeader/>
                    </Fragment>
                )}
            </Grid.Column>
        </Grid>
    )
}

export default observer(StatisticsDashboard)