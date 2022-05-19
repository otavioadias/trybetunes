import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from './Carregando';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    inputArtist: '',
    disabled: true,
    loading: false,
    redirect: false,
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
      redirect: true,
    });
  }

  onButtonClick = async (event) => {
    event.preventDefault();
    const { inputArtist } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputArtist });
    this.clearInput();
  }

  render() {
    const { inputArtist, disabled, loading, redirect } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
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
          {loading === true && <Carregando />}
          {redirect === true && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Search;
