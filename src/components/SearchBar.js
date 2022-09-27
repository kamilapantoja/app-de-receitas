import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../CSS/SearchBar.css';

function SearchBar() {
  const { foodRecipes, drinkRecipes, getDrinks, getFoods } = useContext(RecipesContext);
  const [radioSelected, setRadioSelected] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (foodRecipes.length === 1) {
      history.push(`/foods/${foodRecipes[0].idMeal}`);
    }
    if (drinkRecipes.length === 1) {
      history.push(`/drinks/${drinkRecipes[0].idDrink}`);
    }
  }, [drinkRecipes, foodRecipes, history]);

  const searchBtn = () => {
    const { pathname } = location;
    if (radioSelected === '') {
      return global.alert('Select Filter');
    }
    if (radioSelected === 'First-Letter' && searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (pathname === '/foods') {
      getFoods(radioSelected, searchInput);
    }
    if (pathname === '/drinks') {
      getDrinks(radioSelected, searchInput);
    }
  };

  return (
    <div className="searchBar-container">

      <div className="container-input-searchBar">
        <input
          className="input-searchBar"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchInput(target.value) }
          type="text"
        />
      </div>
      <nav className="nav-searchBar">
        <label htmlFor="ingredient" className="label-searchBar">
          Ingredient
          <input
            className="radio-searchBar"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => setRadioSelected(target.value) }
            value="Ingredient"
            type="radio"
            name="radio-search"
            id="ingredient"
          />
        </label>
        <label htmlFor="name-search" className="label-searchBar">
          Name
          <input
            className="radio-searchBar"
            data-testid="name-search-radio"
            onChange={ ({ target }) => setRadioSelected(target.value) }
            value="Name"
            type="radio"
            name="radio-search"
            id="name-search"
          />
        </label>
        <label htmlFor="first-letter" className="label-searchBar">
          First Letter
          <input
            className="radio-searchBar"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => setRadioSelected(target.value) }
            value="First-Letter"
            type="radio"
            name="radio-search"
            id="first-letter"
          />
        </label>
        <button
          className="btn-searchBar"
          data-testid="exec-search-btn"
          onClick={ searchBtn }
          type="button"
        >
          Search
        </button>
      </nav>
    </div>
  );
}

export default SearchBar;
