import React, { useEffect, useContext } from "react";
import { Layout } from "./components/Layout";
import Home from "./components/Home";
import Login from "./components/User/Login";
import {
  Route,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { RootStoreContext } from "./stores/rootStore";
import LoadingComponent from './form/LoadingComponent';
import { observer } from 'mobx-react-lite';
import Register from "./components/User/Register";
import RecipeDetails from "./components/Recipe/RecipeDetails";
import AddRecipe from "./components/Recipe/AddRecipe";
import Manage from "./components/Manage/Manage";
import './App.scss';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: linear-gradient(to bottom, #feada6 0%, #f5efef 100%);
  }
`

const App: React.FC<RouteComponentProps> = ({location}) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded)  return <LoadingComponent content='Ładowanie aplikacji...' />

  return (
    <Layout>
      <GlobalStyle/>
      <Route exact path="/" component={Home} />
      <Route path="/account/login" component={Login} />
      <Route path="/account/register" component={Register} />
      <Route path="/recipe/details/:id" component={RecipeDetails}/>
      <Route path="/recipe/addrecipe/" component={AddRecipe}/>
      <Route path="/manage" component={Manage}/>
    </Layout>
  );
};

export default withRouter(observer(App));
