import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from './Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    inputUser: '',
    disabled: true,
    loading: false,
    redirect: false,
  };

  onButtonChange = () => {
    const { inputUser } = this.state;
    const NUM_MIN = 3;
    if (inputUser.length >= NUM_MIN) {
      return this.setState({ disabled: false });
    } this.setState({ disabled: true });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, this.onButtonChange);
  }

  clearInput = () => {
    this.setState({
      inputUser: '',
      disabled: true,
      loading: false,
      redirect: true,
    });
  }

  onButtonClick = async (event) => {
    event.preventDefault();
    const { inputUser } = this.state;
    this.setState({ loading: true });
    await createUser({ name: inputUser });
    this.clearInput();
  }

  render() {
    const { inputUser, disabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            value={ inputUser }
            id="inputUser"
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
        </form>
        {loading === true && <Carregando />}
        {redirect === true && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
