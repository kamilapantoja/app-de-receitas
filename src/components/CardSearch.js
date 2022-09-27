import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import style from '../CSS/CardsContainer.module.css';

function CardSearch() {
  const { foodRecipes, drinkRecipes } = useContext(RecipesContext);

  return (
    <>
      {foodRecipes.map((even, index) => (
        <Link key={ index } to={ `/foods/${even.idMeal}` } className={ style.card }>
          <div className="card-search" data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ even.strMealThumb }
              alt={ even.strMeal }
            />
            <p data-testid={ `${index}-card-name` }>{ even.strMeal }</p>
          </div>
        </Link>
      ))}
      {drinkRecipes.map((even, index) => (
        <Link key={ index } to={ `/drinks/${even.idDrink}` }>
          <div className="card-search" data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ even.strDrinkThumb }
              alt={ even.strDrink }
            />
            <p data-testid={ `${index}-card-name` }>{ even.strDrink }</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default CardSearch;
