export const fetchFoodsByNatinalities = async (country) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  const response = await fetch(URL);
  const result = await response.json();
  return result.meals;
};

export const fetchCountries = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(URL);
  const result = await response.json();
  return result.meals;
};
