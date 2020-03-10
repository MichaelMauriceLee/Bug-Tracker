import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

/*
 * React component to be used when waiting for a page to load
 */

const LoadingComponent: React.FC<{ inverted?: boolean; content?: string }> =
    ({
         inverted = true,
         content
     }) => {
        return (
            <Dimmer active inverted={inverted}>
                <Loader content={content}/>
            </Dimmer>
        );
    };

export default LoadingComponent;
