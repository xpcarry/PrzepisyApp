import React, { useState, useEffect } from 'react';
import agent from '../../api/agent';
import { Popup, Icon, Table } from 'semantic-ui-react';
import { IManageRecipe } from '../../models/recipe';
import LoadingComponent from '../../form/LoadingComponent';

const ManageRecipes = () =>{

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getRecipes();
        setLoading(false);
    }, [])

    const getRecipes = async () => {
        await agent.Recipes.listall()
            .then(response => {
                setRecipes(response);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDelete = async (e:any, {value}:any) => {
        await agent.Recipes.deleteRecipe(value)
            .then(response => {
            })
            getRecipes();
    };

    if (loading) return <LoadingComponent content='Ładowanie...' />

    return(
        <Table verticalAlign='middle' compact celled >
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'>Tytuł</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Dodane przez</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Data dodania</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Akcje</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {recipes.map((recipe: IManageRecipe) => (
                <Table.Row key={recipe.id}>
                    <Table.Cell textAlign='center'>{recipe.title}</Table.Cell>
                    <Table.Cell textAlign='center'>{recipe.username}</Table.Cell>
                    <Table.Cell textAlign='center'>{recipe.datePosted!.toString().split('T')[0]}</Table.Cell>
                    <Table.Cell textAlign='center'>                           
                        <Popup content='Usuń ogłoszenie' trigger={
                        <Icon value={recipe.id} onClick={handleDelete} name='delete' style={{cursor:'pointer'}}/>
                        } />
                    </Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
    )
}
export default ManageRecipes;