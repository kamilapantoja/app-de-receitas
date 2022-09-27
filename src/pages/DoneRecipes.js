import React, { useEffect, useState } from 'react';
import '../CSS/DoneRecipes.css';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [receitasProntas, setReceitasProntas] = useState([]);
  const [receitasProntasFilter, setReceitasProntasFilter] = useState([]);
  const [copiedLink, setCopiedLink] = useState([]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage !== null) {
      setReceitasProntas(getLocalStorage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReceitasProntasFilter(receitasProntas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receitasProntas]);

  const copyBtn = ({ target }) => {
    copy(`${window.location.origin}/foods/${target.id}`);
    setCopiedLink([...copiedLink, target.id]);
  };

  const filterRecipesByType = (type) => {
    const filterType = receitasProntas.filter((tipo) => tipo.type === type);
    setReceitasProntasFilter(filterType);
  };

  return (
    <div>
      <HeaderWithoutSearch titlePage="Done Recipes" />
      <section className="done-recipes">
        <div className="btns-filters">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ () => setReceitasProntasFilter(receitasProntas) }
          >
            All

          </button>
          <button
            data-testid="filter-by-food-btn"
            onClick={ () => filterRecipesByType('food') }
            type="button"
          >
            Food

          </button>
          <button
            data-testid="filter-by-drink-btn"
            onClick={ () => filterRecipesByType('drink') }
            type="button"
          >
            Drinks

          </button>
        </div>

        {receitasProntasFilter.map((even, index) => (
          <div className="card-Done-Recipes" key={ index }>
            <Link
              className="img-card-done-link"
              to={ (even.type === 'drink')
                ? `/drinks/${even.id}` : `/foods/${even.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                className="img-card-done"
                src={ even.image }
                alt={ even.name }
              />
            </Link>
            <div className="details-done-recipes">
              <p
                className="fWhite categoryType"
                data-testid={ `${index}-horizontal-top-text` }
              >
                { (even.type === 'drink')
                  ? `${even.category}`
                  : `${even.nationality} - ${even.category}`}

              </p>
              {even.alcoholicOrNot.includes('Alcoholic') && (
                <p
                  className="fWhite"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  Alcoholic

                </p>) }
              {even.alcoholicOrNot.includes('non-alcoholic') && (
                <p
                  className="fWhite"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  Non alcoholic

                </p>) }
              <Link
                to={ (even.type === 'drink')
                  ? `/drinks/${even.id}` : `/foods/${even.id}` }
              >
                <p
                  className="fWhite nameDon"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { even.name }

                </p>
              </Link>
              <p
                className="fWhite"
                data-testid={ `${index}-horizontal-done-date` }
              >
                { even.doneDate }

              </p>
              {even.tags.map((ev, id) => (
                <span
                  className="fWhite tagsa"
                  data-testid={ `${index}-${ev}-horizontal-tag` }
                  key={ id }
                >
                  { ev }
                </span>
              ))}
              <div className="fWhite divShar">
                <button
                  type="button"
                  className="share-btn"
                  onClick={ copyBtn }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    id={ even.id }
                    src={ shareIcon }
                    className="fWhite"
                    alt="share"
                  />
                </button>
                {copiedLink.includes(even.id) && (
                  <span className="fWhite">Link copied!</span>) }
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
