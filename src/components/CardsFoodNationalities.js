import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/ExploreNationalities.css';

function CardsFoodNationalities() {
  const { recipes } = useContext(RecipesContext);
  const limit = 12;

  return (
    <section className="container">

      {recipes.map((elem, index) => {
        if (index < limit) {
          return (
            <Link key={ elem.idMeal } to={ `/foods/${elem.idMeal}` }>
              <div className="card-search" data-testid={ `${index}-recipe-card` }>
                <img
                  className="nationalities-images"
                  data-testid={ `${index}-card-img` }
                  src={ elem.strMealThumb }
                  alt={ elem.strMeal }
                />
                <h3 data-testid={ `${index}-card-name` }>{ elem.strMeal }</h3>
              </div>
            </Link>
          );
        }
        return null;
      })}
    </section>

  );
}

export default CardsFoodNationalities;
