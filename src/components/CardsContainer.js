import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Recipescard from './RecipesCard';
import style from '../CSS/CardsContainer.module.css';

const mealTags = ['strMealThumb', 'strMeal', 'idMeal', 'foods'];
const drinkTags = ['strDrinkThumb', 'strDrink', 'idDrink', 'drinks'];
export default function CardsContainer({ rote, recipes, limit, testId }) {
  let tags = [];
  if (rote === '/foods' || rote.includes('drinks/')) {
    tags = mealTags;
  } else {
    tags = drinkTags;
  }
  const id = rote.includes('s/')
    ? '-recomendation-title' : '-card-name';

  return (
    recipes.map((recipe, i) => {
      if (!recipe[tags[0]] && !recipe[tags[2]]) return null;
      if (i < limit) {
        let clas = '';
        if (i > 1 && rote.includes('s/')) clas = 'hide';

        return (
          <Link
            to={ `/${tags[3]}/${recipe[tags[2]]}` }
            key={ recipe[tags[1]] + i }
            className={ `${style.card} ${clas}` }
            data-testid={ `${i}${testId}` }
          >
            <Recipescard
              src={ recipe[tags[0]] }
              nameId={ `${i}${id}` }
              name={ recipe[tags[1]] }
              imgId={ `${i}-card-img` }
            />
          </Link>);
      }
      return null;
    })
  );
}

CardsContainer.propTypes = {
  rote: PropTypes.string,
  recipes: PropTypes.arrayOf(),
  limit: PropTypes.string,
}.isRequired;
