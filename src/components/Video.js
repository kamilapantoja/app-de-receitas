import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Video({ url }) {
  const [id, setId] = useState('');
  useEffect(() => {
    const getId = () => {
      if (url) {
        const index = url.indexOf('=');
        const videoId = url.slice(index + 1);

        setId(videoId);
      }
    };

    getId();
  });

  return (
    <iframe
      width="300"
      height="250"
      src={ `https://www.youtube.com/embed/${id}` }
      frameBorder="0"
      allowFullScreen
      title="Embedded youtube"
      data-testid="video"
    />
  );
}

Video.propTypes = {
  url: PropTypes.string,
}.isRequired;

export default Video;
