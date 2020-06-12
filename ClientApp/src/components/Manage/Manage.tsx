import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Grid, Menu, Segment, Header } from 'semantic-ui-react';
import ManageRecipes from './ManageRecipes';
import ManageUsers from './ManageUsers';
import { RootStoreContext } from '../../stores/rootStore';
import { history } from '../../index'


const Manage = () => {
    const [activeItem, setActiveItem] = useState('Użytkownicy');
    const rootStoreContext = useContext(RootStoreContext);
    const {user, isAdmin} = rootStoreContext.userStore;


    useEffect(() => {
        if (user === null || isAdmin === false){
            history.push('/')
        }
        loadComponent();
    }, [activeItem, user, isAdmin])

    const handleItemClick = (e: any, { name }: any) => setActiveItem(name);
    const loadComponent = () =>{
        switch(activeItem){
            case 'Użytkownicy': return <ManageUsers/>
            case 'Ogłoszenia': return <ManageRecipes/>
        }
    }

    return (
        <Fragment>
            <Header
                as='h2'
                content='Panel administratora'
                color='black'
            />
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item
                            name='Użytkownicy'
                            active={activeItem === 'Użytkownicy'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name='Przepisy'
                            active={activeItem === 'Przepisy'}
                            onClick={handleItemClick}
                        />
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment content={loadComponent()}>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}
export default Manage;