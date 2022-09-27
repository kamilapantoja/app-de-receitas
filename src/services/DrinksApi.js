const getUrl = (type, category) => {
  switch (type) {
  case 'category':
    return 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  case 'filter':
    return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  case 'id':
    return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${category}`;
  case 'recomendation':
    return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  case 'random':
    return 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  default:
    return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
};

export const fetchDrinks = async (type, category) => {
  const URL = getUrl(type, category);
  const response = await fetch(URL);
  const result = await response.json();
  return result.drinks;
};

const igredienteUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const nomeUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const fisrtLetterUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const apiSearchDrink = async (radio, input) => {
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
  const { drinks } = await response.json();
  if (drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  }
  const magicNumber = 12;
  if (drinks.length > magicNumber) {
    return drinks.slice(0, magicNumber);
  }
  return drinks;
};
