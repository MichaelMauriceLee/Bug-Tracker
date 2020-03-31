import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { ITicket } from '../../../app/models/ticket';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

const TicketDetailedInfo: React.FC<{ticket: ITicket}> = ({ticket}) => {
    return (
        <Segment.Group>
              <Segment attached='top'>
                <Grid>
                  <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <p>{ticket.description}</p>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='calendar' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={15}>
                    <span>
                      {format(ticket.submissionDate, 'eeee do MMMM')} at{" "}
                      {format(ticket.submissionDate, 'h:mm a')}
                    </span>
                  </Grid.Column>
                </Grid>
              </Segment>
              <Segment attached>
                <Grid verticalAlign='middle'>
                  <Grid.Column width={1}>
                    <Icon name='sitemap' size='large' color='teal' />
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <span>{ticket.category}</span>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Segment.Group>
    )
}

export default observer(TicketDetailedInfo);