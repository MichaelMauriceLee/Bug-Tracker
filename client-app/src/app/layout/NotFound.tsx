import React from 'react';
import {Segment, Button, Header, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

/*
 * React page to be used when a page cannot be found
 */

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
                Oops - we've looked everywhere but couldn't find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/dashboard' primary>
                    Return to my home page
                </Button>
            </Segment.Inline>
        </Segment>
    );
};

export default NotFound;