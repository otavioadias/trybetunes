import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    informationsAlbum: {},
    musicsAlbum: [],
  }

  async componentDidMount() {
    const { match } = this.props;
    const album = await getMusics(match.params.id);
    const informations = album[0];
    const musics = album.slice(1, album.length);
    this.setState({ musicsAlbum: musics });
    this.setState({ informationsAlbum: informations });
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
        <MusicCard
          album={ musicsAlbum }
        />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
