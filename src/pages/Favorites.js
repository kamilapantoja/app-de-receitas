import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import filledHeart from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import style from '../CSS/Favorites.module.css';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [copyAlert, setCopyAlert] = useState(false);
  const [filter, setfilter] = useState('');
  useEffect(() => {
    const getFav = () => {
      const fav = JSON.parse(localStorage.getItem('favoriteRecipes')) || favorites;
      setFavorites(fav);
    };
    getFav();
  }, []);

  const handleShare = (id, type) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopyAlert(true);
  };

  const handleFavorite = (id) => {
    const filteredFav = favorites.filter(({ id: favId }) => favId !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...filteredFav]));
    setFavorites(filteredFav);
  };

  return (
    <div>
      <HeaderWithoutSearch titlePage="Favorite Recipes" />
      <div className={ style.filters }>
        <button
          type="button"
          onClick={ () => setfilter('') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setfilter('food') }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => setfilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {favorites
        .filter(({ type }) => type.includes(filter))
        .map(
          (
            { id, type, nationality, category, alcoholicOrNot, name, image },
            i,
          ) => (
            <div key={ id } className={ style.card_container }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ name }
                  className={ style.card_img }
                  data-testid={ `${i}-horizontal-image` }
                />
              </Link>
              <div className={ style.info }>
                <div>
                  <p data-testid={ `${i}-horizontal-top-text` }>
                    {type === 'food'
                      ? `${nationality} - ${category}`
                      : alcoholicOrNot}
                  </p>
                  <Link to={ `/${type}s/${id}` }>
                    <h3 data-testid={ `${i}-horizontal-name` }>{name}</h3>
                  </Link>
                </div>
                <div className={ style.buttons_container }>
                  <button type="button" onClick={ () => handleShare(id, type) }>
                    <img
                      src={ share }
                      alt=""
                      data-testid={ `${i}-horizontal-share-btn` }
                    />
                  </button>
                  <button type="button" onClick={ () => handleFavorite(id) }>
                    <img
                      src={ filledHeart }
                      alt=""
                      data-testid={ `${i}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      {copyAlert && (
        <div className={ style.alert_background }>
          <div className={ style.alert }>
            <h3>Link copied!</h3>
            <button type="button" onClick={ () => setCopyAlert(false) }>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
