import React, {useContext, Fragment} from 'react';
import {Item, Label} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {RootStoreContext} from '../../../app/stores/rootStore';
import TeamListItem from './TeamListItem';

/*
 * React component that contains the list of teams
 */

const TeamList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { teamsByName } = rootStore.teamStore;
    return (
        <Fragment>
            {teamsByName.map(([group, teams]) => (
                <Fragment key={group}>
                    <Label size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {teams.map(team => (
                            <TeamListItem key={team.id} team={team} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </Fragment>
    );
};

export default observer(TeamList);
