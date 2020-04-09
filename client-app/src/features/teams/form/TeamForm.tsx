import React, {useState, useContext, useEffect} from 'react';
import {Segment, Form, Button, Grid} from 'semantic-ui-react';
import {TeamFormValues} from '../../../app/models/team';
import {v4 as uuid} from 'uuid';
import {observer} from 'mobx-react-lite';
import {RouteComponentProps} from 'react-router';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import {
    combineValidators,
    isRequired,
    composeValidators,
    hasLengthGreaterThan
} from 'revalidate';
import {RootStoreContext} from '../../../app/stores/rootStore';

const validate = combineValidators({
    name: isRequired({message: 'The team name is required'}),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({
            message: 'Description needs to be at least 5 characters'
        })
    )()
});

interface DetailParams {
    id: string;
}

const TeamForm: React.FC<RouteComponentProps<DetailParams>> =
    ({
         match,
         history
     }) => {
        const rootStore = useContext(RootStoreContext);
        const {
            createTeam,
            editTeam,
            submitting,
            loadTeam
        } = rootStore.teamStore;

        const [team, setTeam] = useState(new TeamFormValues());
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            if (match.params.id) {
                setLoading(true);
                loadTeam(match.params.id)
                    .then(team => {
                        setTeam(new TeamFormValues(team));
                    })
                    .finally(() => setLoading(false));
            }
        }, [loadTeam, match.params.id]);

        const handleFinalFormSubmit = (values: any) => {
            const {date, time, ...team} = values;
            if (!team.id) {
                let newTeam = {
                    ...team,
                    id: uuid()
                };
                createTeam(newTeam);
            } else {
                editTeam(team);
            }
        };

        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment clearing>
                        <FinalForm
                            validate={validate}
                            initialValues={team}
                            onSubmit={handleFinalFormSubmit}
                            render={({handleSubmit, invalid, pristine}) => (
                                <Form onSubmit={handleSubmit} loading={loading}>
                                    <Field
                                        name='name'
                                        placeholder='Name'
                                        value={team.name}
                                        component={TextInput}
                                    />
                                    <Field
                                        name='description'
                                        placeholder='Description'
                                        rows={3}
                                        value={team.description}
                                        component={TextAreaInput}
                                    />
                                    <Button
                                        loading={submitting}
                                        disabled={loading || invalid || pristine}
                                        floated='right'
                                        positive
                                        type='submit'
                                        content='Submit'
                                    />
                                    <Button
                                        onClick={
                                            team.id
                                                ? () => history.push(`/teams/${team.id}`)
                                                : () => history.push('/teams')
                                        }
                                        disabled={loading}
                                        floated='right'
                                        type='button'
                                        content='Cancel'
                                    />
                                </Form>
                            )}
                        />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    };

export default observer(TeamForm);
