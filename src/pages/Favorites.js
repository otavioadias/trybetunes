import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    checked: false,
    favorites: [],
  }

  async componentDidMount() {
    const newArray = await getFavoriteSongs();
    this.setState({ favorites: newArray });
  }

  render() {
    const { checked, favorites } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
        {favorites.map((music) => (
          <MusicCard
            key={ music.previewUrl }
            music={ music }
            checkbox={ checked }
          />
        ))}
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
