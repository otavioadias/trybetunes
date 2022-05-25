import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    loading: false,
    arrayFavorites: [],
    checked: false,
  }

  async componentDidMount() {
    const { music } = this.props;
    const newArray = await getFavoriteSongs();
    this.setState({ checked: newArray.some((cur) => cur.trackId === music.trackId) });
  }

  onInputChange = async (music) => {
    const { arrayFavorites } = this.state;
    const test = arrayFavorites.some((cur) => cur.trackId === music.trackId);
    if (test) {
      const newArray = arrayFavorites.filter((cur) => cur.trackId !== music.trackId);
      this.setState({ arrayFavorites: newArray, checked: false });
    } else {
      this.setState((previousState) => (
        { arrayFavorites: [...previousState.arrayFavorites, music] }
      ));
      this.setState({ checked: true });
    }
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false });
  }

  verify = (trackId) => {
    const { arrayFavorites } = this.state;
    return arrayFavorites.some((cur) => cur.trackId === trackId);
  }

  render() {
    const { music } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading === true && <Carregando />}
        <ul>
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
                onChange={ () => this.onInputChange(music) }
                checked={ checked }
              />
              Favorita
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
