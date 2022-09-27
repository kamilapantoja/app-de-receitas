import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import '../CSS/ExploreFoods.css';

function ExploreDrinks() {
  const { redirectRandomDrink } = useContext(RecipesContext);
  return (
    <main>
      <HeaderWithoutSearch titlePage="Explore Drinks" />
      <section className="explore-main">
        <Link to="/explore/drinks/ingredients">
          <button
            className="btn-explore-foods"
            type="button"
            data-testid="explore-by-ingredient"
          >
            By Ingredient
          </button>
        </Link>

        <button
          className="btn-explore-foods"
          type="button"
          data-testid="explore-surprise"
          onClick={ () => redirectRandomDrink() }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </main>
  );
}

export default ExploreDrinks;
