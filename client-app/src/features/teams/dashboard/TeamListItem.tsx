import React from 'react';
import { Item, Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ITeam } from '../../../app/models/team';

const TeamListItem: React.FC<{ team: ITeam }> = ({ team }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as={Link} to={`/teams/${team.id}`}>
                                {team.name}
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`/teams/${team.id}`}
                    floated='right'
                    content='View'
                    color='blue'
                />
            </Segment>
        </Segment.Group>
    );
};

export default TeamListItem;
