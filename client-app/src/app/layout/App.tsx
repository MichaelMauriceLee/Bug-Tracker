import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import NavSideBar from '../../features/nav/NavSideBar';
import NavMenu from '../../features/nav/NavMenu';
import TeamDashboard from '../../features/teams/dashboard/TeamDashboard';
import {observer} from 'mobx-react-lite';
import {
    Route,
    withRouter,
    RouteComponentProps,
    Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import TeamForm from '../../features/teams/form/TeamForm';
import TeamDetails from '../../features/teams/details/TeamDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import {RootStoreContext} from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import TicketDashboard from '../../features/tickets/dashboard/TicketDashboard';
import InfoDashboard from '../../features/statistics/StatisticsDashboard'
import { ITicket } from '../models/ticket';
import axios from 'axios'
import TicketDetails from '../../features/tickets/details/TicketDetails';
import TicketForm from '../../features/tickets/form/TicketForm';

/*
 * Main React component that houses all other components
 * This component mainly specifies routes for react router
 */


const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
    const {getUser} = rootStore.userStore;
    const [tickets, setTickets] = useState<ITicket[]>([])

    // useEffect(()=> {
    //     axios.get<ITicket[]>("http://localhost:5000/api/activities").then(response => {
    //         setTickets(response.data)
    //     });
    // }, []);    //adding this second parameter of an empty array ensures that useEffect runs one time only! VERY IMPORTANT, otherwise we enter a loop!
    // right now we are using componentDidMount indicated by the [], we can also use the other lifecycle methods as we'll see later



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
                                <PrivateRoute exact path='/teams' component={TeamDashboard}/>
                                <PrivateRoute path='/teams/:id' component={TeamDetails}/>
                                <PrivateRoute
                                    key={location.key}
                                    path={['/createTeam', '/manage/:id']}
                                    component={TeamForm}
                                />
                                <PrivateRoute exact path='/tickets' component={TicketDashboard}/>
                                <PrivateRoute path='/tickets/:id' component={TicketDetails} />
                                <PrivateRoute 
                                    key = {location.key} 
                                        path={['/createTicket', '/manageTicket/:id']} 
                                        component={TicketForm} 
                                    />
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
