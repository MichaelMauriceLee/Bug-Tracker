import React, {Fragment} from 'react';
import {Segment, Placeholder} from 'semantic-ui-react';

/*
 * React component used as a placeholder for statistics while loading
 */

const StatisticsPlaceholder = () => {
    return (
        <Fragment>
            <Placeholder fluid style={{marginTop: 50}}>
                <Segment.Group>
                    <Segment style={{minHeight: 110}}>
                        <Placeholder>
                            <Placeholder.Header image>
                                <Placeholder.Line/>
                                <Placeholder.Line/>
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line/>
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};
export default StatisticsPlaceholder;