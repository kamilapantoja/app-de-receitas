import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import './App.css';
import Login from './pages/Login';
import Mainpage from './pages/MainPage';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import InProgress from './pages/InProgress';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreByNatinalities from './pages/ExploreByNationalities';
import Notfound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Mainpage } />
        <Route exact path="/drinks" component={ Mainpage } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/foods/:id/in-progress" component={ InProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ Favorites } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreByNatinalities }
        />
        <Route exact path="*" component={ Notfound } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
