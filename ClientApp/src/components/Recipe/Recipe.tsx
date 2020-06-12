import React, { Fragment } from "react";
import style from '../../styles/recipe.module.scss'
import placeholder from '../../pictures/120x150.png'
import { IRecipe } from '../../models/recipe'
import { Link } from "react-router-dom";
import { Label } from "semantic-ui-react";
import ogorki from '../../pictures/ogorki.png'

const Recipe: React.FC<{ recipe: IRecipe }> = ({ recipe }) => {
    return (
        <div className={style.itemwrap}>
            <Link className={style.link} to={`/recipe/details/${recipe.id}`}>
                <div className={style.picture}>
                    <img height="150" width="120" src={recipe.imageUrl} alt="" />
                </div>
                <div className={style.details}>
                    <h5 className={style.title}>{recipe.title}</h5>
                    <span>Typ: {recipe.recipeType}</span><br />
                    <span>Trudność: {recipe.recipeDifficulty}</span><br />
                    <div style={{marginTop:'5px'}}>
                        <Label.Group size='tiny' color='blue'>
                            {recipe.ingredients.map((ingrediant: string) => (
                                <Label as='a'>{ingrediant}</Label>
                            ))}
                        </Label.Group>
                    </div>
                </div>
            </Link>
        </div >

    );
};

export default Recipe;