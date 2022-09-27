import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchFoods } from '../services/RecipesApi';
import { fetchCountries,
  fetchFoodsByNatinalities } from '../services/FoodsNationalitiesApi';
import '../CSS/NationalitiesDropdown.css';

function NationalitiesDropdown() {
  const { setRecipes, setCountries, countries } = useContext(RecipesContext);
  const [optionSelected, setOptionSelected] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const nationalities = await fetchCountries();
      setCountries(nationalities);

      if (optionSelected && optionSelected !== 'All') {
        const data = await fetchFoodsByNatinalities(optionSelected);
        setRecipes(data);
      } else {
        const data = await fetchFoods();
        setRecipes(data);
      }
    };
    fetchData();
  }, [optionSelected, setRecipes]);

  return (
    <nav className="nav-class">
      <select
        className="select-box"
        data-testid="explore-by-nationality-dropdown"
        onChange={ (e) => setOptionSelected(e.target.value) }
      >
        <option data-testid="All-option" value="All">All</option>
        {countries.map(({ strArea }) => (

          <option
            key={ strArea }
            data-testid={ `${strArea}-option` }
            value={ strArea }
          >
            {strArea}

          </option>

        ))}
      </select>
    </nav>
  );
}

export default NationalitiesDropdown;
