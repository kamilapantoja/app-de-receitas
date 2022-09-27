const mealTags = ['food', 'strArea', 'strCategory', 'strMeal', 'strMealThumb'];
const drinkTags = [
  'drink',
  'strCategory',
  'strAlcoholic',
  'strDrink',
  'strDrinkThumb',
];

const setFavorite = (obj, id) => {
  const favoriteRecipe = {
    id,
    type: obj[mealTags[1]] ? mealTags[0] : drinkTags[0],
    nationality: obj[mealTags[1]] || '',
    category: obj[mealTags[2]] || obj[drinkTags[1]],
    alcoholicOrNot: obj[drinkTags[2]] || '',
    name: obj[mealTags[3]] || obj[drinkTags[3]],
    image: obj[mealTags[4]] || obj[drinkTags[4]],
  };
  let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favorites.some(({ id: favID }) => favID === id)) {
    favorites = favorites.filter(({ id: favID }) => favID !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favorites, favoriteRecipe]),
    );
  }
};

export default setFavorite;
