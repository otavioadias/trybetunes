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
  }

  async componentDidMount() {
    const { match } = this.props;
    const album = await getMusics(match.params.id);
    const informations = album[0];
    const musics = album.slice(1, album.length);
    this.setState({ musicsAlbum: musics });
    this.setState({ informationsAlbum: informations });
    this.songsFavorites();
    // this.verify(musics.trackId);
    // console.log(this.verify(musics.trackId));
  }

  songsFavorites = async () => {
    // const { musicsAlbum } = this.state;
    const savedFavoriteSongs = await getFavoriteSongs();
    // console.log(musicsAlbum);
    console.log(savedFavoriteSongs);
    // this.setState({ favorites: savedFavoriteSongs });
    // musicsAlbum.forEach((music) => (
    //   savedFavoriteSongs.some((musicAlbum) => (
    //     ((musicAlbum === music.trackId) && this.setState({ checked: true }))))));
  }

  render() {
    const { informationsAlbum, musicsAlbum } = this.state;
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
            key={ music.TrackId }
            music={ music }
            // checked={ checked }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
