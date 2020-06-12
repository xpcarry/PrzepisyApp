import React, { useState, useEffect } from 'react';
import Recipe from './Recipe/Recipe';
import style from '../styles/home.module.scss';
import { Divider, Header, Segment, Dropdown, Form, Button } from 'semantic-ui-react';
import agent from '../api/agent';
import { IRecipe } from '../models/recipe';
import { recipeTypeOptions, difficultyOptions } from '../form/options/options';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeType, setRecipeType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    console.log(recipes);
    getRecipes();
  }, []);

  const getRecipes = async () => {
    await agent.Recipes.home(recipeType, difficulty)
      .then(response => {
        if (response) {
          setRecipes(response);
        }
      });
  };

  const updateRecipeType = (event: any, { value }: any) => {
    setRecipeType(value);
  };

  const updateDifficulty = (event: any, { value }: any) => {
    setDifficulty(value);
  };

  const updateAuthor = (event: any, {value}:any) =>{
    setAuthor(value);
  }

  return (
    <div>
      <Segment>
        <h2>Wyszukaj przepisy</h2>
        <p>
          Nadszedł czerwiec, a wraz z nim sezon na same pyszności. Na straganach rozgościła się botwina, młoda kapusta i bób. Są też nasze ulubione polskie owoce – truskawki, czereśnie i wiśnie. Nie przegap tego momentu, bo wiele z tych skarbów towarzyszy nam dość krótko. Co więc przygotować z pierwszych letnich owoców i warzyw? Czerwiec to przecież idealny czas na rodzinne grillowanie!
        </p>
      </Segment>
      <Segment>
        <Header as="h4">Zastosuj filtry</Header>
        <Form onSubmit={getRecipes}>
          <Dropdown
            style={{ marginRight: 20 }}
            placeholder="Rodzaj przepisu"
            selection
            options={recipeTypeOptions}
            onChange={updateRecipeType}
          />
          <Dropdown
            style={{ marginRight: 20 }}
            placeholder="Trudność wykonania"
            selection
            search={true}
            options={difficultyOptions}
            onChange={updateDifficulty}
          />
          <Dropdown
            style={{ marginRight: 20 }}
            placeholder="Autor"
            selection
            search={true}
            options={[]}
            onChange={updateAuthor}
          />
          <Button primary type="submit">Zastosuj</Button>
        </Form>
      </Segment>
      <Divider horizontal>
        <Header as="h4">Przepisy</Header>
      </Divider>
      <div className={style.recipeContainer}>
        {recipes.map((recipe: IRecipe) => (
          <Recipe key={recipe.id} recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
