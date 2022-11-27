import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    informationsAlbum: {},
    musicsAlbum: [],
    // favorites: [],
    checked: false,
  }

  async componentDidMount() {
    const { match } = this.props;
    const album = await getMusics(match.params.id);
    const informations = album[0];
    const musics = album.slice(1, album.length);
    this.setState({ musicsAlbum: musics });
    this.setState({ informationsAlbum: informations });
    const newArray = await getFavoriteSongs();
    this.setState({ checked: newArray.some((cur) => musics.includes(cur.trackId)) });
  }

  render() {
    const { informationsAlbum, musicsAlbum, checked } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <ol>
          <h2 data-testid="album-name">
            { `${informationsAlbum.collectionName}`}
          </h2>
          <h3 data-testid="artist-name">
            { `${informationsAlbum.artistName}`}
          </h3>
        </ol>
        {musicsAlbum.map((music) => (
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

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
