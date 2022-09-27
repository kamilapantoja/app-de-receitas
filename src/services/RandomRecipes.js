const randomFoods = 'https://www.themealdb.com/api/json/v1/1/random.php';
const randomDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const getRandomDrink = async () => {
  const response = await fetch(randomDrinks);
  const { drinks: [{ idDrink }] } = await response.json();
  return idDrink;
};

export const getRandomFood = async () => {
  const response = await fetch(randomFoods);
  const { meals: [{ idMeal }] } = await response.json();
  return idMeal;
};
