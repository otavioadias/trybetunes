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
      <div
        className="min-h-screen
      bg-black min-w-full text-white"
      >
        <Header />
        <div
          data-testid="page-search"
          className="flex flex-col items-center
         bg-black min-w-full text-white"
        >
          {loading === true ? <Carregando /> : (
            <>
              <form
                className="flex gap-5 m-10"
              >
                <input
                  type="text"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista/Banda"
                  value={ inputArtist }
                  id="inputArtist"
                  onChange={ this.onInputChange }
                  className="bg-white
              text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl"
                />
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ disabled }
                  onClick={ this.onButtonClick }
                  className="bg-white
              text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl
              hover:shadow-indigo-900/60 cursor-pointer"
                >
                  Pesquisar
                </button>
              </form>
              <main
                className="min-w-full flex flex-grow flex-wrap
                justify-center"
              >
                {`Resultado de álbuns de: ${resultArtist}`}
                {array.length > 0 ? (
                  <ol
                    className="min-w-full flex flex-grow flex-wrap
                    gap-20 justify-center m-20"
                  >
                    {array.map((artist) => (
                      <li key={ `${artist.collectionId}` }>
                        <Link
                          data-testid={ `link-to-album-${artist.collectionId}` }
                          key={ `${artist.collectionId}` }
                          to={ `/album/${artist.collectionId}` }
                          className="text-white flex flex-col w-40 h-40
                          hover:shadow-zinc-100/80 cursor-pointer"
                        >
                          { <img
                            src={ `${artist.artworkUrl100}` }
                            alt={ `${artist.name}` }
                          /> }
                          { `${artist.collectionName}`}
                        </Link>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <h2>
                    Nenhum álbum foi encontrado
                  </h2>
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
