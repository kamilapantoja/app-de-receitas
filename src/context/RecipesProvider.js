import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { fetchFoods, apiSearchRecipes } from '../services/RecipesApi';
import { fetchDrinks, apiSearchDrink } from '../services/DrinksApi';
import { fetchFoodsIngredients, fetchDrinksIngredients }
from '../services/IngredientsApi';
import { getRandomDrink, getRandomFood } from '../services/RandomRecipes';
// import { fetchCountries } from '../services/FoodsNationalitiesApi';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState('');
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [ingredientsImgs, setIngredientsImgs] = useState([]);
  const [RecipeId, setRecipeId] = useState('');
  const [Details, setDetails] = useState({});
  const [Recomendation, setRecomendation] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filterByNationality, setFilterByNationality] = useState('');
  const [randomPage, setRandomPage] = useState('');
  const [useCardSearch, setUseCardSearch] = useState(false);
  const [filterByIngredient, setFilterbyIngredient] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (location === '/foods') {
        setRecipes(await fetchFoods());
        setCategories(await fetchFoods('category'));
      } else if (location === '/drinks') {
        setRecipes(await fetchDrinks());
        setCategories(await fetchDrinks('category'));
      }
      if (location === '/explore/foods/ingredients') {
        setIngredientsList(await fetchFoodsIngredients());
      }
      if (location === '/explore/drinks/ingredients') {
        setIngredientsList(await fetchDrinksIngredients());
      }
    };

    fetchRecipes();
  }, [location]);

  useEffect(() => {
    const getDetails = async () => {
      if (RecipeId) {
        let details;
        if (location.includes('food')) {
          details = await fetchFoods('id', RecipeId);
          setRecomendation(await fetchDrinks());
        } else {
          details = await fetchDrinks('id', RecipeId);
          setRecomendation(await fetchFoods());
        }
        setDetails(details[0]);
      }
    };

    getDetails();
  }, [RecipeId, location]);

  const getDrinks = async (radio, input) => {
    const drinks = await apiSearchDrink(radio, input);
    setDrinkRecipes(drinks);
  };
  const getFoods = async (radio, input) => {
    const foods = await apiSearchRecipes(radio, input);
    setFoodRecipes(foods);
  };

  const getFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (favorites.some(({ id: favId }) => favId === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const saveDoneRecipes = (objDone) => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (done === null) {
      return localStorage.setItem('doneRecipes', JSON.stringify([objDone]));
    }
    return localStorage.setItem('doneRecipes', JSON.stringify([...done, objDone]));
  };

  const checkStorage = (idx) => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    if (doneRecipes[0] === null) {
      doneRecipes = [];
    }
    if (doneRecipes.some((i) => i.id === idx)) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
    const cocktails = inProgressRecipes.cocktails ? Object
      .keys(inProgressRecipes.cocktails).includes(idx) : false;
    const meals = inProgressRecipes.meals ? Object
      .keys(inProgressRecipes.meals).includes(idx) : false;

    if (cocktails || meals) {
      setInProgress(true);
    } else {
      setInProgress(false);
    }

    getFavorite(idx);
  };

  const redirectRandomFood = async () => {
    const idRecipeFood = await getRandomFood();
    history.push(`/foods/${idRecipeFood}`);
  };

  const redirectRandomDrink = async () => {
    const iecipeDrink = await getRandomDrink();
    history.push(`/drinks/${iecipeDrink}`);
  };

  const saveProgress = (type, ixd, progress) => {
    const saveProg = {
      cocktails: {},
      meals: {},
    };
    const progressVeri = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressVeri === null) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify(saveProg));
    }
    if (type === 'foods') {
      progressVeri.cocktails[ixd] = progress;
      return localStorage.setItem('inProgressRecipes', JSON.stringify(progressVeri));
    }
    if (type === 'drinks') {
      progressVeri.meals[ixd] = progress;
      return localStorage.setItem('inProgressRecipes', JSON.stringify(progressVeri));
    }
  };

  const contextValue = {
    drinkRecipes,
    foodRecipes,
    ingredientsList,
    ingredientsImgs,
    recipes,
    categories,
    filterByCategory,
    Details,
    Recomendation,
    isDone,
    inProgress,
    isFavorite,
    countries,
    filterByNationality,
    randomPage,
    filterByIngredient,
    getDrinks,
    getFoods,
    setRecipes,
    setLocation,
    setFilterByCategory,
    setIngredientsList,
    setIngredientsImgs,
    setRecipeId,
    checkStorage,
    getFavorite,
    setIsFavorite,
    setFilterByNationality,
    setRandomPage,
    useCardSearch,
    setUseCardSearch,
    redirectRandomFood,
    redirectRandomDrink,
    setCountries,
    setFilterbyIngredient,
    saveProgress,
    saveDoneRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
