const getUrl = (type, category) => {
  switch (type) {
  case 'category':
    return 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  case 'filter':
    return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  case 'id':
    return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${category}`;
  case 'recomendation':
    return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  case 'random':
    return 'https://www.themealdb.com/api/json/v1/1/random.php';
  default:
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  }
};

export const fetchFoods = async (type, category) => {
  const URL = getUrl(type, category);
  const response = await fetch(URL);
  const result = await response.json();
  return result.meals;
};

const igredienteUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const nomeUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const fisrtLetterUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const apiSearchRecipes = async (radio, input) => {
  let url = '';
  switch (radio) {
  case 'Ingredient':
    url = igredienteUrl + input;
    break;
  case 'Name':
    url = nomeUrl + input;
    break;
  default:
    url = fisrtLetterUrl + input;
  }
  const response = await fetch(url);
  const { meals } = await response.json();
  if (meals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  }
  const magicNumber = 12;
  if (meals.length > magicNumber) {
    return meals.slice(0, magicNumber);
  }
  return meals;
};
