import React, {useContext, useEffect, useState} from 'react';
import {Grid, Loader, Button} from 'semantic-ui-react';
import TeamList from './TeamList';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import TeamListItemPlaceholder from './TeamListItemPlaceholder';
import TeamFilters from './TeamFilters';
import { NavLink } from 'react-router-dom';

/*
 * React component that contains a list of activities
 */


const TeamDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadTeams,
        loadingInitial,
        setPage,
        page,
        totalPages
    } = rootStore.teamStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadTeams().then(() => setLoadingNext(false));
    };

    useEffect(() => {
        loadTeams();
    }, [loadTeams]);

    return (
        <Grid>
            <Grid.Column width={10}>
                {loadingInitial && page === 0 ? (
                    <TeamListItemPlaceholder />
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && page + 1 < totalPages}
                        initialLoad={false}
                    >
                        <TeamList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width={6}>
                <TeamFilters />
                <Button
                    as={NavLink}
                    to='/createTeam'
                    positive
                    content='Create Team'
                />
            </Grid.Column>
            <Grid.Column width={11}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    );
};

export default observer(TeamDashboard);
