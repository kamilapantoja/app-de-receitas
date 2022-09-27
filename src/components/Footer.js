import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer navbar-fixed-bottom">
      <Link to="/drinks">
        <img
          className="drinks-icon"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"
        />
      </Link>

      <Link to="/explore">
        <img
          className="explore-icon"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-icon"
        />
      </Link>

      <Link to="/foods">
        <img
          className="food-icon"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
