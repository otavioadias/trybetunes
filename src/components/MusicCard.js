import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <div>
        <ol>
          {album.map((music) => (
            <li key={ `${music.collectionId}` }>
              { `${music.trackName}`}
              {
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
              }
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.objectOf.isRequired,
};

export default MusicCard;
