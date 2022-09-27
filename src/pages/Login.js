import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validationEmail, validationPassword } from '../helpers/validationLogin';
import '../CSS/Login.css';
import Logo from '../components/imgs/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [IsDisabled, setIsDisabled] = useState(true);

  const handleChange = ({ target: { name, value } }) => (
    name === 'email' ? setEmail(value) : setPassword(value));

  useEffect(() => {
    const validate = validationEmail(email) && validationPassword(password);
    if (validate) setIsDisabled(false);
    else setIsDisabled(true);
  }, [email, password]);

  const { push } = useHistory();

  const saveSubmission = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    push('/foods');
  };

  return (
    <div className="login">
      <div>
        <img className="img-logo" src={ Logo } alt="logo-receitas-mundi" />
      </div>

      <form>
        <input
          className="login-data"
          data-testid="email-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
        />
        <input
          className="login-data"
          data-testid="password-input"
          name="password"
          type="password"
          placeholder="Senha acima de 6 caracteres"
          onChange={ handleChange }
        />
        <button
          className="login-button"
          data-testid="login-submit-btn"
          name="button"
          type="button"
          disabled={ IsDisabled }
          onClick={ saveSubmission }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
