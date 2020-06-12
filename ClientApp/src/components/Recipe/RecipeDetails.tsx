import React, { useState, useEffect, Fragment } from 'react';
import LoadingComponent from '../../form/LoadingComponent';
import agent from '../../api/agent';
import { Grid, Image, Header, Table, Segment } from 'semantic-ui-react';
import { IDetails } from '../../models/details';
import { IRecipe } from '../../models/recipe';

const RecipeDetails = ({
  match,
}: any, ) => {
  const [recipe, setRecipe] = useState<IRecipe>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe(match.params.id);
  }, [match.params.id])

  const loadRecipe = async (id: string) => {
    try {
      await agent.Recipes.details(id)
        .then((response: IRecipe) => {
          setRecipe(response);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  if (loading) return <LoadingComponent content='Ładowanie apikacji...' />;
  if (!recipe) return <h2>Nie odnaleziono ogłoszenia</h2>;

  return (
    <Fragment>
      <Header style={{ textAlign: 'center' }} as='h2'>{recipe.title}</Header>
      <Grid stackable>
        <Grid.Column width={4}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
        </Grid.Column>
        <Grid.Column width={8}>
          <Table basic>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Kalorie:</Table.Cell>
                <Table.Cell>{recipe.calories} kcal</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Typ:</Table.Cell>
                <Table.Cell>{recipe.recipeType}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Trudność przygotowania:</Table.Cell>
                <Table.Cell>{recipe.recipeDifficulty} cm</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Header as='h3'>Opis przygotowania:</Header>
          <Segment>
            {recipe.description}
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment padded style={{textAlign:'center'}}>
            <b>Ogłoszenie zamieszczone</b> <br/> {recipe.datePosted!.toString().split('T')[0]}
          </Segment>
          <Segment padded style={{textAlign:'center'}}>
            <b>Dane użytkownika</b><br/>
            {recipe.user!.name}<br/>
            {recipe.user!.username}<br/>
            <a href={`mailto:${recipe.user!.email}`}>{recipe.user!.email}</a>
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>

  )



}
export default RecipeDetails;