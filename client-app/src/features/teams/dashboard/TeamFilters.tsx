import {Fragment, useContext} from "react"
import React from "react"
import {Menu, Header} from "semantic-ui-react"
import {RootStoreContext} from "../../../app/stores/rootStore";

const TeamFilters = () => {
    const rootStore = useContext(RootStoreContext);
    const {predicate, setPredicate} = rootStore.teamStore;
    return (
        <Fragment>
            <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
                <Header icon={'filter'} attached color={'teal'} content={'Filters'}/>
                <Menu.Item
                    active={predicate.size === 0}
                    onClick={() => setPredicate('all', 'true')}
                    color={'blue'}
                    name={'all'}
                    content={'All Teams'}
                />
                <Menu.Item
                    active={predicate.has('isTeamMem')}
                    onClick={() => setPredicate('isTeamMem', 'true')}
                    color={'blue'}
                    name={'username'}
                    content={"Teams I belong to"}
                />
                <Menu.Item
                    active={predicate.has('isManager')}
                    onClick={() => setPredicate('isManager', 'true')}
                    color={'blue'}
                    name={'manager'}
                    content={"Teams I lead"}
                />
            </Menu>
        </Fragment>
    )
}

export default TeamFilters