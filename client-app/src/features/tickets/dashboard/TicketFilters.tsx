import React, { Fragment, useContext } from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const TicketFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const {predicate, setPredicate} = rootStore.ticketStore;
  return (
    <Fragment>
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 45 }}>
        <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
        <Menu.Item 
            active={predicate.size === 0} 
            onClick={() => setPredicate('all', 'true')}
            color={'blue'} 
            name={'all'} 
            content={'All Tickets'} 
        />
        <Menu.Item 
            active = {predicate.has('isSubmitter')}
            onClick = {() => setPredicate('isSubmitter', 'true')}
            color={'blue'} 
            name={'username'} 
            content={"Submitted By Me"} 
        />
        <Menu.Item 
            active = {predicate.has('isAssignee')}
            onClick = {() => setPredicate('isAssignee', 'true')}
            color={'blue'} 
            name={'host'} 
            content={"Assigned To Me"} 
        />
      </Menu>
    </Fragment>
  );
} 

export default observer(TicketFilters);