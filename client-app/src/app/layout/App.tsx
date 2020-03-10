import React, {Fragment, useContext, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import NavSideBar from '../../features/nav/NavSideBar';
import NavMenu from '../../features/nav/NavMenu';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {observer} from 'mobx-react-lite';
import {
    Route,
    withRouter,
    RouteComponentProps,
    Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import {RootStoreContext} from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import TicketDashboard from '../../features/tickets/TicketDashboard';
import InfoDashboard from '../../features/infodashboard/InfoDashboard'

/*
 * Main React component that houses all other components
 * This component mainly specifies routes for react router
 */

const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
    const {getUser} = rootStore.userStore;

    useEffect(() => {
        if (token) {
            getUser().finally(() => setAppLoaded())
        } else {
            setAppLoaded();
        }
    }, [getUser, setAppLoaded, token])

    if (!appLoaded) return <LoadingComponent content='Loading app...'/>

    return (
        <Fragment>
            <ModalContainer/>
            <ToastContainer position='bottom-right'/>
            <Route exact path='/' component={HomePage}/>
            <Route
                path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavMenu/>
                        <Container style={{marginTop: '7em'}}>
                            <Switch>
                                <PrivateRoute path='/dashboard' component={InfoDashboard}/>
                                <PrivateRoute exact path='/activities' component={ActivityDashboard}/>
                                <PrivateRoute path='/activities/:id' component={ActivityDetails}/>
                                <PrivateRoute
                                    key={location.key}
                                    path={['/createActivity', '/manage/:id']}
                                    component={ActivityForm}
                                />
                                <PrivateRoute path='/tickets' component={TicketDashboard}/>
                                <PrivateRoute path='/profile/:username' component={ProfilePage}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
};

export default withRouter(observer(App));
