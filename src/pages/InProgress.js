import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import style from '../CSS/RecipeDetails.module.css';
import emptyHeart from '../images/whiteHeartIcon.svg';
import filledHeart from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import setFavorite from '../helpers/setFavorite';
import backArrow from '../images/arrowbackbutton_79955.svg';
import '../CSS/InProgress.css';

function InProgress() {
  const { pathname } = useLocation();
  const {
    setLocation,
    setRecipeId,
    Details,
    isDone,
    checkStorage,
    isFavorite,
    setIsFavorite,
    saveProgress,
    saveDoneRecipes,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { push } = useHistory();
  const [copyAlert, setCopyAlert] = useState(false);
  const [ingredientsProgress, setIngredientsProgress] = useState([]);
  const [locationRecipe, setLocationRecipe] = useState('');
  const [doneTag, setDoneTag] = useState('');
  const [hablebtnfi, sethablebtnfi] = useState(true);
  useEffect(() => {
    setLocation(pathname);
    setRecipeId(id);
    checkStorage(id);
  });
  const mealTags = [
    'strMealThumb',
    'strMeal',
    'strCategory',
    'strInstructions',
    'idMeal',
    'strCategory',
    'strTags',
    'strArea',
  ];
  const drinkTags = [
    'strDrinkThumb',
    'strDrink',
    'strAlcoholic',
    'strInstructions',
    'idDrink',
    'strCategory',
    'strTags',
  ];
  useEffect(() => {
    const loc = pathname.split('/')[1];
    setLocationRecipe(loc);
    const tagsDon = pathname.includes('foods') ? mealTags : drinkTags;
    setDoneTag(tagsDon);
    const getProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getProgress === null) {
      return setIngredientsProgress([]);
    }
    if (loc === 'foods' && getProgress.cocktails[id] !== undefined) {
      return setIngredientsProgress(getProgress.cocktails[id]);
    }
    if (loc === 'drinks' && getProgress.meals[id] !== undefined) {
      return setIngredientsProgress(getProgress.meals[id]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    saveProgress(locationRecipe, id, ingredientsProgress);
    const che = [...document.querySelectorAll('.chek')];
    const cheFi = [...document.querySelectorAll('.finish')];
    if (che.length === cheFi.length) {
      sethablebtnfi(false);
    } else {
      sethablebtnfi(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsProgress]);

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

  const handleShare = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/${locationRecipe}/${id}`);
    setCopyAlert(true);
  };
  const handleFavorite = () => {
    setFavorite(Details, id);
    setIsFavorite(!isFavorite);
  };
  const progressCheckbox = (position) => {
    if (ingredientsProgress.includes(position)) {
      const filterPosition = ingredientsProgress.filter((ev) => ev !== position);
      return setIngredientsProgress(filterPosition);
    }
    return setIngredientsProgress([...ingredientsProgress, position]);
  };
  const finishBtn = (tag) => {
    // Exemplo de formatação de data tirado do site https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = `${dia}/${mes}/${ano}`;
    const objDone = {
      id: Details[tag[4]],
      type: locationRecipe.includes('foods') ? 'food' : 'drink',
      nationality: locationRecipe.includes('foods') ? Details[tag[7]] : '',
      category: Details[tag[5]],
      alcoholicOrNot: locationRecipe.includes('foods') ? '' : Details[tag[2]],
      name: Details[tag[1]],
      image: Details[tag[0]],
      doneDate: dataAtual,
      tags: (Details[tag[6]] !== null) ? Details[tag[6]].split(',') : [],
    };
    saveDoneRecipes(objDone);
    push('/done-recipes');
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
                data-testid={ `${i}-ingredient-step` }
              >
                {ingredientsProgress.includes(i)
                  ? (
                    <label className="progress finishd" htmlFor={ i }>
                      <input
                        onChange={ () => progressCheckbox(i) }
                        type="checkbox"
                        className="chek finish"
                        checked
                        id={ i }
                      />
                      {`${ing} - ${measure}`}
                    </label>
                  )
                  : (
                    <label className="progress" htmlFor={ i }>
                      <input
                        onChange={ () => progressCheckbox(i) }
                        type="checkbox"
                        className="chek"
                        id={ i }
                      />
                      {`${ing} - ${measure}`}
                    </label>
                  )}

              </li>
            );
          })}
        </ul>
        <h2 className={ style.titles }>Instructions</h2>
        <p data-testid="instructions" className={ style.text }>
          {Details[tags[3]]}
        </p>
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
        <div className="btnFinishdDiv">
          <button
            type="button"
            className="btnFinishd"
            data-testid="finish-recipe-btn"
            disabled={ hablebtnfi }
            onClick={ () => finishBtn(doneTag) }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default InProgress;
