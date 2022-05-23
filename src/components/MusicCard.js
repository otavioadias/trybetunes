import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    favorite: '',
    loading: false,
  }

  onInputChange = async (event) => {
    const { favorite } = this.state;
    this.setState({ [event.target.id]: event.target.value });
    this.setState({ loading: true });
    const songs = await addSong(favorite);
    this.setState({ loading: false });
    console.log(await getFavoriteSongs());
  }

  render() {
    const { album } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {loading === true && <Carregando />}
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
              <label htmlFor="favorite">
                <input
                  type="checkbox"
                  id="favorite"
                  value={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                  onChange={ this.onInputChange }
                />
                Favorita
              </label>
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
