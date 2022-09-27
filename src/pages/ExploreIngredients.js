import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import ExploreFoodIngredients from '../components/ExploreFoodIngredients';
import ExploreDrinksIngredients from '../components/ExploreDrinksIngredients';

function ExploreIngredients() {
  const { pathname } = useLocation();
  const { setLocation } = useContext(RecipesContext);

  useEffect(() => {
    setLocation(pathname);
  }, [pathname, setLocation]);

  return (
    <main>
      <HeaderWithoutSearch titlePage="Explore Ingredients" />
      {
        pathname === '/explore/foods/ingredients'
          ? (<ExploreFoodIngredients />)
          : (<ExploreDrinksIngredients />)
      }
      <Footer />
    </main>
  );
}

export default ExploreIngredients;
