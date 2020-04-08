import React, { useContext } from 'react';
import {Segment, Grid, Icon, Header, Button} from 'semantic-ui-react';
import {ITeam} from '../../../app/models/team';
import TeamMemberList from './TeamMemberList';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

/*
 * React component that renders information on the selected team
 * 
 */

const TeamDetailedInfo: React.FC<{ team: ITeam }> = ({team}) => {
    const rootStore = useContext(RootStoreContext);
    const { belongTeam, unbelongTeam, loading, deleteTeam, submitting } = rootStore.teamStore;
    return (
        <Segment.Group>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Team Information</Header>
            </Segment>
            <Segment attached>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='address card outline'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{team.name}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{team.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment clearing attached='bottom'>
                {team.isManager ? (
                    <Button.Group>
                        <Button
                            as={Link}
                            to={`/manage/${team.id}`}
                            color='orange'
                            floated='left'
                        >
                            Manage Team Info
                        </Button>
                        <Button
                            loading={submitting}
                            onClick={()=> deleteTeam(team)}
                            color='red'
                            floated='right'
                        >
                            Delete Team
                        </Button>
                    </Button.Group>
                ) : team.isTeamMem ? (
                    <Button loading={loading} onClick={unbelongTeam}>
                        Resign from team
                    </Button>
                ) : (
                    <Button loading={loading} onClick={belongTeam} color='teal'>
                        Join Team
                    </Button>
                )}
            </Segment>
            <TeamMemberList isManager={team.isManager} members={team.members}/>
        </Segment.Group>
    );
};

export default observer(TeamDetailedInfo);
