import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';

describe('Testa o componente Explore.js', () => {
  it('Teste se o topo da aplicação contém todos os items do corpo principal',
    () => {
      renderWithRouter(<Explore />);
      const foodText = screen.getByText(/explore foods/i);
      const drinksText = screen.getByText(/explore drinks/i);
      const button1 = screen.getByTestId('explore-foods');
      const button2 = screen.getByTestId('explore-drinks');

      expect(foodText).toBeInTheDocument();
      expect(drinksText).toBeInTheDocument();
      expect(button1).toBeDefined();
      expect(button2).toBeDefined();
    });
  it('Testa o redirecionamento do link "Explore Foods"',
    () => {
      const { history } = renderWithRouter(<Explore />);

      const buttonFood = screen.getByRole('button', { name: /explore foods/i });
      expect(buttonFood).toBeDefined();

      userEvent.click(buttonFood);
      const { pathname } = history.location;
      expect(pathname).toBe('/explore/foods');
    });
  it('Testa o redirecionamento do link "Explore Drinks"',
    () => {
      const { history } = renderWithRouter(<Explore />);

      const buttonDrinks = screen.getByRole('button', { name: /explore drinks/i });
      expect(buttonDrinks).toBeDefined();

      userEvent.click(buttonDrinks);
      const { pathname } = history.location;
      expect(pathname).toBe('/explore/drinks');
    });

  it('Verifica os itens do Footer',
    () => {
      renderWithRouter(<Explore />);
      const THREE = 3;
      const imgLinks = screen.getAllByRole('img');
      expect(imgLinks).toHaveLength(THREE);
    });

  it('Testa o redirecionamento do primeiro link do Footer',
    () => {
      const { history } = renderWithRouter(<Explore />);
      const drinksImg1Link = screen.getByTestId('drinks-bottom-btn');
      expect(drinksImg1Link).toBeDefined();

      userEvent.click(drinksImg1Link);
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks');
    });
  it('Testa o redirecionamento do segundo link do Footer',
    () => {
      const { history } = renderWithRouter(<Explore />);
      const exploreImg1Link = screen.getByTestId('explore-bottom-btn');
      expect(exploreImg1Link).toBeDefined();

      userEvent.click(exploreImg1Link);
      const { pathname } = history.location;
      expect(pathname).toBe('/explore');
    });
  it('Testa o redirecionamento do terceiro link do Footer',
    () => {
      const { history } = renderWithRouter(<Explore />);
      const foodsImg1Link = screen.getByTestId('food-bottom-btn');
      expect(foodsImg1Link).toBeDefined();

      userEvent.click(foodsImg1Link);
      const { pathname } = history.location;
      expect(pathname).toBe('/foods');
    });
});
