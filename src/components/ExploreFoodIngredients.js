import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import IngredientsCard from './IngredientsCard';
import { fetchFoodsImages, fetchFoodsListByIngredient } from '../services/IngredientsApi';
import '../CSS/ExploreFoodIngredients.css';

function ExploreFoodIngredients() {
  const { ingredientsList,
    setFilterbyIngredient } = useContext(RecipesContext);

  const fetchIngredientsData = async (ingredient) => {
    const getData = await fetchFoodsListByIngredient(ingredient);
    const filteredCards = setFilterbyIngredient(getData);
    return filteredCards;
  };

  return (
    <section className="container">
      {ingredientsList.map(({ idIngredient, strIngredient }, index) => {
        const CARD_LIMIT = 12;
        if (index < CARD_LIMIT) {
          return (
            <Link
              to="/foods"
              key={ idIngredient }
              onClick={ () => fetchIngredientsData(strIngredient) }
            >
              <IngredientsCard
                name={ strIngredient }
                index={ index }
                src={ fetchFoodsImages(strIngredient) }
              />
            </Link>
          );
        }
        return null;
      })}
    </section>
  );
}

export default ExploreFoodIngredients;
