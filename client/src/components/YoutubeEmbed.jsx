import React from 'react';
import YouTube from 'react-youtube';

const YoutubeEmbed = ({ id }) => {
  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={id} opts={opts} />
    </div>
  );
  };


export default YoutubeEmbed;