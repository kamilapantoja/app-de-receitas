export const fetchFoodsIngredients = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result.meals;
};

export const fetchFoodsImages = (name) => {
  const src = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  return src;
};

export const fetchFoodsListByIngredient = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result.meals;
};

export const fetchDrinksIngredients = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result.drinks;
};

export const fetchDrinksImages = (name) => {
  const src = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  return src;
};

export const fetchDrinksListByIngredient = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result.drinks;
};
