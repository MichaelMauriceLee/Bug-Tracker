import React, {useContext} from 'react'
import {RouteProps, RouteComponentProps, Route, Redirect} from 'react-router-dom';
import {RootStoreContext} from '../stores/rootStore';
import {observer} from 'mobx-react-lite';

/*
 * Create a private page that the user can view only if logged in
 */

interface IProps extends RouteProps {
    component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoute: React.FC<IProps> = ({component: Component, ...rest}) => {
    const rootStore = useContext(RootStoreContext);
    const {isLoggedIn} = rootStore.userStore;
    return (
        <Route
            {...rest}
            render={(props) => isLoggedIn ? <Component {...props}/> : <Redirect to='/'/>}
        />
    )
}

export default observer(PrivateRoute)
