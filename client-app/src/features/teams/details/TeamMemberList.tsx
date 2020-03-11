import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IMember } from '../../../app/models/team';
import { observer } from 'mobx-react-lite';

interface IProps {
    members: IMember[];
}

const TeamMemberList: React.FC<IProps> = ({ members }) => {
    return (
        <Fragment>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {members.length} {members.length === 1 ? 'Person' : 'People'} in this team:
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {members.map(member => (
                        <Item key={member.username} style={{ position: 'relative' }}>
                            {member.isManager && (
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    Project Manager
                                </Label>
                            )}
                            <Image size='tiny' src={member.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profile/${member.username}`}>
                                        {member.displayName}
                                    </Link>
                                </Item.Header>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </Fragment>
    );
};

export default observer(TeamMemberList);
