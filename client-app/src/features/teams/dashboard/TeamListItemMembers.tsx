import React from 'react';
import {List, Image, Popup} from 'semantic-ui-react';
import {IMember} from '../../../app/models/team';

/*
 * React component that contains a list of attendees
 */

interface IProps {
    attendees: IMember[];
}

const styles = {
    borderColor: 'orange',
    borderWidth: 2
}

const TeamListItemMembers: React.FC<IProps> = ({attendees}) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.username}>
                    <Popup
                        header={attendee.displayName}
                        trigger={
                            <Image
                                size='mini'
                                circular
                                src={attendee.image || '/assets/user.png'}
                                bordered
                            />
                        }
                    />
                </List.Item>
            ))}
        </List>
    );
};

export default TeamListItemMembers;
