import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class Favorites extends React.Component {
  state = {
    checked: false,
    loading: false,
    favorites: [],
  }

  async componentDidMount() {
    this.getFavorite();
  }

  async componentDidUpdate() {
    this.getFavorite();
  }

  getFavorite = async () => {
    const newArray = await getFavoriteSongs();
    this.setState({ favorites: newArray });
  }

  onInputChange = async (music) => {
    this.setState({ checked: false, loading: true });
    await removeSong(music);
    const arrayMusicsStorage = await getFavoriteSongs();
    this.setState({ loading: false });
    return this.setState({ favorites: arrayMusicsStorage });
  }

  render() {
    const { checked, favorites, loading } = this.state;
    return (
      <div>
        <Header />
        { loading === true ? <Carregando />
          : (
            <div data-testid="page-favorites">
              Favorites
              {favorites.map((music) => (
                <MusicCard
                  key={ music.previewUrl }
                  music={ music }
                  checkbox={ checked }
                  onChange={ () => this.onInputChange }
                />
              ))}
            </div>)}
      </div>
    );
  }
}

Favorites.propTypes = {
  music: PropTypes.shape({
    trackId: PropTypes.number,
    collectionId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

export default Favorites;
