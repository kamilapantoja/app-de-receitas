import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import '../CSS/HeaderWithoutSearch.css';

function HeaderWithoutSearch({ titlePage }) {
  return (
    <header className="HeaderWithoutSearch">
      <Link to="/profile" className="HeaderWithoutSearch-profile">
        <img
          className="HeaderWithoutSearch-profile"
          data-testid="profile-top-btn"
          src={ ProfileIcon }
          alt="profile"
        />
      </Link>
      <h3
        className="HeaderWithoutSearch-title"
        data-testid="page-title"
      >
        { titlePage }

      </h3>
    </header>
  );
}

HeaderWithoutSearch.propTypes = {
  titlePage: PropTypes.string,
}.isRequired;

export default HeaderWithoutSearch;
