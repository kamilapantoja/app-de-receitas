import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/Profile.css';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function Profile() {
  const [emailUsuario, setEmailUsuario] = useState('');
  const history = useHistory();
  // teste
  useEffect(() => {
    // setEmailUsuario(JSON.parse(localStorage.getItem('user')));
    const getUserTeste = localStorage.getItem('user');
    const userTeste = JSON.parse(getUserTeste);
    if (userTeste) {
      setEmailUsuario(userTeste.email);
    }
  }, []);

  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <HeaderWithoutSearch titlePage="Profile" />
      <section className="profile-main">
        <h3 className="email" data-testid="profile-email">{ emailUsuario }</h3>
        <button
          className="btn-profile"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          type="button"
        >
          Done Recipes

        </button>
        <button
          data-testid="profile-favorite-btn"
          className="btn-profile"
          onClick={ () => history.push('/favorite-recipes') }
          type="button"
        >
          Favorite Recipes

        </button>
        <button
          data-testid="profile-logout-btn"
          className="btn-profile"
          onClick={ logoutBtn }
          type="button"
        >
          Logout

        </button>
        <Footer />
      </section>
    </div>
  );
}

export default Profile;
