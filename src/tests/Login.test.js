import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';

const emailConst = 'email-input';
const passwordConst = 'password-input';
const buttonConst = 'login-submit-btn';
const testeEmailConst = 'teste@teste.com';

describe(`Requisito 2: testa se todos os elementos possuem
        os atributos descritos no protótipo para a tela de login`, () => {
  beforeEach(() => {
    render(<App />);
  });

  test('Testa se o input de email possui o atributo data-testid="email-input', () => {
    const email = screen.getByTestId(emailConst);
    expect(email).toBeInTheDocument();
  });

  test(`Testa se o input de senha deve possui o atributo 
      data-testid="password-input`, () => {
    const password = screen.getByTestId(passwordConst);
    expect(password).toBeInTheDocument();
  });

  test('Testa se o botão Enter possui o atributo data-testid="login-submit-btn"', () => {
    const login = screen.getByTestId(buttonConst);
    expect(login).toBeInTheDocument();
  });
});

describe(`Requisito 3, 4 e 5: Testa se a pessoa consegue escrever 
seu email e senha no input, e verifica se o botão está habilitado`, () => {
  test('Testa requisito 3, 4 e 5', () => {
    render(<App />);
    const email = screen.getByTestId(emailConst);
    const password = screen.getByTestId(passwordConst);
    const loginButton = screen.getByTestId(buttonConst);
    userEvent.type(email, testeEmailConst);
    userEvent.type(password, '1234567');
    expect(loginButton).toBeEnabled();
  });
});

describe('Requisito 6, 7 e 8: Testa os LocalStorage', () => {
  test('Testa os requisitos 6, 7 e 8', () => {
    render(<App />);
    const email = screen.getByTestId(emailConst);
    const password = screen.getByTestId(passwordConst);
    const loginButton = screen.getByTestId(buttonConst);
    userEvent.type(email, testeEmailConst);
    userEvent.type(password, '1234567');
    userEvent.click(loginButton);

    expect(localStorage.getItem('mealsToken')).toEqual('1');
    expect(localStorage.getItem('cocktailsToken')).toEqual('1');
  });
});

/* FALTA TESTES DOS REQUISITOS 7 E 8 */
