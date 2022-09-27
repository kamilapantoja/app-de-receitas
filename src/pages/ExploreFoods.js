import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import '../CSS/ExploreFoods.css';

function ExploreFoods() {
  const { redirectRandomFood } = useContext(RecipesContext);
  return (
    <main>
      <HeaderWithoutSearch titlePage="Explore Foods" />
      <section className="explore-main">
        <Link to="/explore/foods/ingredients">
          <button
            className="btn-explore-foods"
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>

        <Link to="/explore/foods/nationalities">
          <button
            className="btn-explore-foods"
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        </Link>

        <button
          className="btn-explore-foods"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => redirectRandomFood() }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default ExploreFoods;
