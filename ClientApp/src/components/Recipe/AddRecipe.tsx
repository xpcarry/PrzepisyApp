import React, { useContext, useEffect } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header, Grid, Segment, Label } from 'semantic-ui-react';
import TextInput from '../../form/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired, composeValidators, isNumeric } from 'revalidate';
import ErrorMessage from '../../form/ErrorMessage';
import { IRecipe } from '../../models/recipe';
import SelectInput from '../../form/SelectInput';
import DateInput from '../../form/DateInput';
import TextAreaInput from '../../form/TextAreaInput';
import agent from '../../api/agent';
import { history } from '../../index'
import { recipeTypeAddOptions, difficultyAddOptions } from '../../form/options/options';
import Login from '../User/Login';

const validate = combineValidators({
    title: isRequired({ message: 'Tytuł jest jest wymagany' }),
    recipeType: isRequired({ message: 'Typ dania jest wymagany' }),
    recipeDifficulty: isRequired({ message: 'Poziom trudności jest wymagany' }),
    calories: composeValidators(
        isRequired({ message: 'Kalorie jest wymagany' }),
        isNumeric({
            message: 'Kalorie musi być liczbą'
        })
    )(),
});

const AddRecipe = () => {
    const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    useEffect(() => {
        // if (user == null) {
        //     history.push('/');
        //     openModal(<Login />, null);
        // }
    }, [openModal, user])

    const addRecipe = async (values: IRecipe) => {
        try {
            const recipe = await agent.Recipes.add(values)
                .then(response => {
                    history.push({
                        pathname: `/recipe/details/${response}`,
                    });
                });
        } catch (error) {
            throw error;
        }
    }
    return (
        <FinalForm
            onSubmit={(values: IRecipe) => {
                values.calories = Number(values.calories);
                addRecipe(values)
                    .catch(error => ({
                        [FORM_ERROR]: error
                    }))
            }}
            validate={validate}
            render={({
                handleSubmit,
                submitting,
                submitError,
                invalid,
                pristine,
                dirtySinceLastSubmit
            }) => (
                    <Form onSubmit={handleSubmit} error style={{ marginBottom: '50px' }}>
                        <Segment>
                        <Header
                            as='h2'
                            content='Dodaj nowy przepis'
                            color='black'
                            textAlign='left'
                        />
                        <p style={{ textAlign: 'justify' }}>
                            Wypełnij wskazane pola aby zamieścić swój przepis na stronę.
                        </p>
                        </Segment>
                            <Grid columns={1} relaxed='very' stackable>
                                <Grid.Column>
                                    <Segment padded>
                                        <Label color='teal' attached='top'>Dane dot. przepisu</Label>
                                        <Field name='title' component={TextInput} placeholder='Tytuł' />
                                        <Field
                                            name='recipeType'
                                            options={recipeTypeAddOptions}
                                            component={SelectInput}
                                            placeholder='Typ dania'
                                        />
                                        <Field
                                            name='calories'
                                            type="number"
                                            component={TextInput}
                                            placeholder='Kalorie'
                                        />
                                        <Field
                                            name='recipeDifficulty'
                                            options={recipeTypeAddOptions}
                                            component={SelectInput}
                                            placeholder='Poziom trudności'
                                        />
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                            <Segment>
                                <Label color='teal' attached='top'>Opis przygotowania</Label>
                                <Field
                                    name='description'
                                    rows={3}
                                    component={TextAreaInput}
                                    placeholder='Opis'
                                />
                            </Segment>
                            {submitError && !dirtySinceLastSubmit && (
                                <ErrorMessage
                                    error={submitError}
                                />
                            )}
                        <Button
                            primary
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                            loading={submitting}
                            content='Umieść przepis'
                            fluid
                            type='submit'
                        />
                    </Form>
                )}
        />
    );
};

export default AddRecipe;