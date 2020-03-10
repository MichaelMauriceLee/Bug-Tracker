import React, {useContext, useEffect} from 'react';
import {Grid} from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import {RouteComponentProps} from 'react-router';
import {RootStoreContext} from '../../app/stores/rootStore';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {observer} from 'mobx-react-lite';

/*
 * React component that displays a user profile
 */

interface RouteParams {
    username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadingProfile,
        profile,
        loadProfile,
        isCurrentUser,
        loading,
        setActiveTab
    } = rootStore.profileStore;

    useEffect(() => {
        loadProfile(match.params.username);
    }, [loadProfile, match]);

    if (loadingProfile) return <LoadingComponent content='Loading profile...'/>;

    return (
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader
                    profile={profile!}
                    isCurrentUser={isCurrentUser}
                    loading={loading}
                />
                <ProfileContent setActiveTab={setActiveTab}/>
            </Grid.Column>
        </Grid>
    );
};

export default observer(ProfilePage);
