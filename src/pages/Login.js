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
      <div
        className="flex flex-col justify-center items-center
        min-h-screen
        bg-gradient-to-r from-black to-slate-900 text-white"
      >
        <div
          data-testid="page-login"
        >
          <form
            className="flex flex-col gap-10 p-20 text-center
            rounded-2xl
            shadow-indigo-900/20 shadow-2xl
            bg-slate-400/5"
          >
            <img
              src="https://cdn.discordapp.com/attachments/938669134890278937/1046768828060799067/20221128_093354_0000-removebg-preview.png"
              alt="TrybeTunesLogo"
              width="300"
            />
            <input
              type="text"
              data-testid="login-name-input"
              placeholder="Nome"
              value={ inputUser }
              id="inputUser"
              onChange={ this.onInputChange }
              className="w-full block rounded p-2 text-black"
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.onButtonClick }
              className="bg-white
               text-black shadow-lg p-2 rounded
               hover:shadow-indigo-900/60 cursor-pointer"
            >
              Entrar
            </button>
          </form>
          {loading === true && <Carregando />}
          {redirect === true && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Login;
