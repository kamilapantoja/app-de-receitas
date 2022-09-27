import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import CardsContainer from '../components/CardsContainer';
import Video from '../components/Video';
import RecipesContext from '../context/RecipesContext';
import style from '../CSS/RecipeDetails.module.css';
import emptyHeart from '../images/whiteHeartIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import setFavorite from '../helpers/setFavorite';
import backArrow from '../images/arrowbackbutton_79955.svg';

function Recipedetails() {
  const { pathname } = useLocation();
  const {
    setLocation,
    setRecipeId,
    Details,
    Recomendation,
    isDone,
    inProgress,
    checkStorage,
    isFavorite,
    setIsFavorite,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { push } = useHistory();
  const [copyAlert, setCopyAlert] = useState(false);

  useEffect(() => {
    setLocation(pathname);
    setRecipeId(id);
    checkStorage(id);
  });

  const getIngredients = (str) => {
    if (Object.keys(Details).length > 0) {
      const keys = Object.keys(Details).filter((key) => key.includes(str));
      const ingredientsList = keys.map((key) => {
        if (Details[key] !== null) return Details[key];

        return '';
      });
      const nullIndex = ingredientsList.indexOf('');

      return ingredientsList.slice(0, nullIndex);
    }
    return [];
  };

  const mealTags = [
    'strMealThumb',
    'strMeal',
    'strCategory',
    'strInstructions',
    'strYoutube',
  ];
  const drinkTags = [
    'strDrinkThumb',
    'strDrink',
    'strAlcoholic',
    'strInstructions',
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setCopyAlert(true);
  };

  const handleFavorite = () => {
    setFavorite(Details, id);
    setIsFavorite(!isFavorite);
  };

  const renderDetails = () => {
    const tags = pathname.includes('foods') ? mealTags : drinkTags;
    return (
      <div>
        <img
          src={ Details[tags[0]] }
          alt={ Details[tags[1]] }
          data-testid="recipe-photo"
          className={ style.recipe_img }
        />
        <div className={ style.title_container }>
          <div>
            <h1 data-testid="recipe-title">{Details[tags[1]]}</h1>
            <p data-testid="recipe-category">{Details[tags[2]]}</p>
          </div>
          <div className={ style.fav_share }>
            <button type="button" onClick={ () => handleFavorite() }>
              <img
                src={ isFavorite ? filledHeart : emptyHeart }
                alt=""
                data-testid="favorite-btn"
              />
            </button>
            <button type="button" onClick={ handleShare } data-testid="share-btn">
              <img src={ share } alt="" />
            </button>
          </div>
        </div>
        <h2 className={ style.titles }>Ingredients</h2>
        <ul className={ style.text }>
          {getIngredients('strIngredient').map((ing, i) => {
            const measure = getIngredients('strMeasure')[i];
            return (
              <li
                key={ ing + measure + i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${ing} - ${measure}`}
              </li>
            );
          })}
        </ul>
        <h2 className={ style.titles }>Instructions</h2>
        <p data-testid="instructions" className={ style.text }>
          {Details[tags[3]]}
        </p>
        {tags[4] && (
          <>
            <h2 className={ style.titles }>Video</h2>
            <div className={ style.video }>
              <Video url={ Details[tags[4]] } />
            </div>
          </>
        )}
        <h2 className={ style.titles }>Recommended</h2>
        <div className={ style.card_container }>
          <CardsContainer
            rote={ pathname }
            limit="6"
            recipes={ Recomendation }
            testId="-recomendation-card"
            nameId="-recomendation-title"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={ style.details_page }>
      <button
        type="button"
        className={ style.back_arrow }
        onClick={ () => push('/foods') }
      >
        <img src={ backArrow } alt="" />
      </button>
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
      {Details && renderDetails()}
      {!isDone && (
        <div className={ style.start_container }>
          <button
            type="button"
            className={ style.start_btn }
            data-testid="start-recipe-btn"
            onClick={ () => push(`${pathname}/in-progress`) }
          >
            {inProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Recipedetails;
