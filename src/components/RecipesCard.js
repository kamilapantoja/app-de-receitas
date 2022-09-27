import React from 'react';
import PropTypes from 'prop-types';

function Recipescard({ name, src, imgId, nameId }) {
  return (
    <div>
      <img src={ src } alt={ name } data-testid={ imgId } />
      <p data-testid={ nameId }>{ name }</p>
    </div>);
}

Recipescard.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
}.isRequired;

export default Recipescard;
