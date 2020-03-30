import React, {useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {RouteComponentProps} from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import TeamDetailedInfo from './TeamDetailedInfo';
import {RootStoreContext} from '../../../app/stores/rootStore';

/*
 * React Component that holds all other components related to TeamDetails
 */

interface DetailParams {
    id: string;
}

const TeamDetails: React.FC<RouteComponentProps<DetailParams>> =
    ({
         match,
         history
     }) => {
        const rootStore = useContext(RootStoreContext);
        const {team, loadTeam, loadingInitial} = rootStore.teamStore;

        useEffect(() => {
            loadTeam(match.params.id);
        }, [loadTeam, match.params.id, history]);

        if (loadingInitial) return <LoadingComponent content='Loading team...'/>;

        if (!team) return <h2>Team not found</h2>;

        return (
            <Grid>
                <Grid.Column width={10}>
                    <TeamDetailedInfo team={team}/>
                </Grid.Column>
            </Grid>
        );
    };

export default observer(TeamDetails);
