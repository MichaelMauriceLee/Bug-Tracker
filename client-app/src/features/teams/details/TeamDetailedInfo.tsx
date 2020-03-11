import React from 'react';
import {Segment, Grid, Icon} from 'semantic-ui-react';
import {ITeam} from '../../../app/models/team';
import TeamMemberList from './TeamMemberList';

/*
 * React component that renders information on the selected team
 * 
 */

const TeamDetailedInfo: React.FC<{ team: ITeam }> = ({team}) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Team Name:</p>
                        <p>{team.name}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Team Description:</p>
                        <p>{team.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <TeamMemberList members={team.members}/>
        </Segment.Group>
    );
};

export default TeamDetailedInfo;
