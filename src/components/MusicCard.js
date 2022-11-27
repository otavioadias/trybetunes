import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    const { arrayFavorites, checked } = this.state;

    if (checked === false) {
      this.setState({ checked: true, loading: true });
      await addSong(music);
      this.setState({ loading: false });
    }

    this.setState({ checked: false, loading: true });
    await removeSong(music);
    this.setState({ loading: false });
    const arrayMusicsStorage = await getFavoriteSongs();

    const test = await arrayMusicsStorage.some((cur) => cur.trackId === music.trackId);
    if (test === false) {
      return this.setState({ arrayFavorites: [...arrayMusicsStorage, music] });
    }
    const newArray = arrayFavorites.filter((cur) => cur.trackId !== music.trackId);
    this.setState({ arrayFavorites: newArray });
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
        {loading === true ? <Carregando />
          : (
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
            </ul>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    collectionId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
