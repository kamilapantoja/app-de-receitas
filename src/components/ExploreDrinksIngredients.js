import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import IngredientsCard from './IngredientsCard';
import { fetchDrinksImages,
  fetchDrinksListByIngredient } from '../services/IngredientsApi';
import '../CSS/ExploreFoodIngredients.css';

function ExploreDrinksIngredients() {
  const { ingredientsList,
    setFilterbyIngredient } = useContext(RecipesContext);

  const fetchIngredientsData = async (ingredient) => {
    const getData = await fetchDrinksListByIngredient(ingredient);
    const filteredCards = setFilterbyIngredient(getData);
    return filteredCards;
  };

  return (
    <section className="container">
      {ingredientsList.map(({ strIngredient1 }, index) => {
        const CARD_LIMIT = 12;
        if (index < CARD_LIMIT) {
          return (
            <Link
              to="/drinks"
              key={ index }
              onClick={ () => fetchIngredientsData(strIngredient1) }
            >

              <IngredientsCard
                name={ strIngredient1 }
                index={ index }
                src={ fetchDrinksImages(strIngredient1) }
              />
            </Link>
          );
        }
        return null;
      })}
    </section>
  );
}

export default ExploreDrinksIngredients;
