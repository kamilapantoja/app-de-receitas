import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CardsContainer from '../components/CardsContainer';
import FiltersWaraper from '../components/FiltersWaraper';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import style from '../CSS/MainPage.module.css';
import CardSearch from '../components/CardSearch';

function Mainpage() {
  const { pathname } = useLocation();
  const {
    setLocation,
    recipes,
    filterByCategory,
    drinkRecipes,
    foodRecipes,
    setUseCardSearch,
    useCardSearch,
    filterByIngredient } = useContext(RecipesContext);

  useEffect(() => {
    setLocation(pathname);
  });

  useEffect(() => {
    if (foodRecipes.length >= 1 || drinkRecipes.length >= 1) {
      setUseCardSearch(true);
    } else {
      setUseCardSearch(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drinkRecipes, foodRecipes]);

  const filteredRecipes = filterByCategory || recipes;
  const filteredListByIngredient = filterByIngredient || filteredRecipes;

  return (
    <div className={ style.main_page }>

      {pathname === '/foods' ? (
        <div>
          <Header titlePage="Foods" />
          <FiltersWaraper pathName={ pathname } />
          <div className={ style.card_container }>

            {(useCardSearch === true)
              ? <CardSearch />
              : (
                <CardsContainer
                  recipes={ filteredListByIngredient }
                  rote={ pathname }
                  limit="12"
                  testId="-recipe-card"
                  nameId="-card-name"
                />)}
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <Header titlePage="Drinks" />
          <FiltersWaraper pathName={ pathname } />
          <div className={ style.card_container }>

            {(useCardSearch) ? <CardSearch />
              : (
                <CardsContainer
                  recipes={ filteredListByIngredient }
                  rote={ pathname }
                  limit="12"
                  testId="-recipe-card"
                  nameId="-card-name"
                />)}
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
