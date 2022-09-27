import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const titlePage = 'page-title';

describe('Implemente os elementos do header na tela principal de receitas', () => {
  test(`Verifica se tem os data-testids 'profile-top-btn', 
  'page-title' e 'search-top-btn'`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId(titlePage);
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(searchTopBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();
  });
});
