import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputArtist: '',
    disabled: true,
    loading: false,
    resultArtist: '',
    array: [],
  };

  onButtonChange = () => {
    const { inputArtist } = this.state;
    const NUM_MIN = 2;
    if (inputArtist.length >= NUM_MIN) {
      return this.setState({ disabled: false });
    } this.setState({ disabled: true });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, this.onButtonChange);
  }

  clearInput = () => {
    this.setState({
      inputArtist: '',
      disabled: true,
      loading: false,
    });
  }

  onButtonClick = async (event) => {
    event.preventDefault();
    const { inputArtist } = this.state;
    this.setState({ loading: true });
    const artist = await searchAlbumsAPI(inputArtist);
    this.setState({ array: artist, resultArtist: inputArtist });
    this.clearInput();
  }

  render() {
    const { inputArtist, disabled, loading, array, resultArtist } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {loading === true ? <Carregando /> : (
            <>
              <form>
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista/Banda"
                  value={ inputArtist }
                  id="inputArtist"
                  onChange={ this.onInputChange }
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ disabled }
                  onClick={ this.onButtonClick }
                >
                  Pesquisar
                </button>
              </form>
              <main>
                {`Resultado de álbuns de: ${resultArtist}`}
                <br />
                {array.length > 0 ? (
                  <ol>
                    {array.map((artist) => (
                      <li key={ `${artist.collectionId}` }>
                        <Link
                          data-testid={ `link-to-album-${artist.collectionId}` }
                          key={ `${artist.collectionId}` }
                          to={ `/album/${artist.collectionId}` }
                        >
                          { `${artist.collectionName}`}
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <h2>Nenhum álbum foi encontrado</h2>
                )}
              </main>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
