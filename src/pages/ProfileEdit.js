import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  state = {
    loading: true,
    name: '',
    image: '',
    description: '',
    email: '',
    disabled: true,
    save: false,
  }

  componentDidMount() {
    this.getInformation();
  }

  getInformation = async () => {
    const dados = await getUser();
    this.setState({
      name: dados.name,
      image: dados.image,
      description: dados.description,
      email: dados.email,
    });
    this.setState({ loading: false });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, this.validate);
  }

  validate = () => {
    const { name, image, description, email } = this.state;
    if (!name || !description || !email || !image) {
      return this.setState({ disabled: true });
    } this.setState({ disabled: false });
  }

  onSave = async (event) => {
    event.preventDefault();
    const { name, description, email, image } = this.state;
    const { history } = this.props;
    await updateUser({ name, email, image, description });
    history.push('/profile');
  }

  render() {
    const { loading, name, description, email, image, disabled, save } = this.state;
    return (
      <div className="bg-black min-w-full text-white">
        <Header />
        <div className="p-7" data-testid="page-profile-edit">Profile Edit</div>
        {loading === true ? (
          <Carregando />
        ) : (
          <main
            className="flex justify-center bg-black min-w-full min-h-screen text-white"
          >
            <forms
              className="flex flex-col items-end gap-10
              bg-black text-white"
            >
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  data-testid="edit-input-name"
                  placeholder="Insira seu nome"
                  value={ name }
                  onChange={ this.onInputChange }
                  className="bg-white text-black shadow-lg
                  max-h-10 py-2 px-4 rounded-2xl mx-2"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="text"
                  id="email"
                  data-testid="edit-input-email"
                  placeholder="Insira seu email"
                  value={ email }
                  onChange={ this.onInputChange }
                  className="bg-white mx-2
                text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl"
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <input
                  type="text"
                  id="description"
                  data-testid="edit-input-description"
                  placeholder="Insira sua descrição"
                  value={ description }
                  onChange={ this.onInputChange }
                  className="bg-white mx-2
                text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl"
                />
              </label>
              <label htmlFor="image">
                Imagem:
                <input
                  type="text"
                  id="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.onInputChange }
                  className="bg-white mx-2
                text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl"
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabled }
                onChange={ this.onInputChange }
                onClick={ this.onSave }
                className="bg-white
              text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl
              hover:shadow-zinc-700/80 cursor-pointer"
              >
                Editar perfil
              </button>
            </forms>
          </main>
        )}
        { save === true && (
          <Redirect
            to="/profile"
            save={ save }
            nameEdit={ name }
            emailEdit={ email }
            descriptionEdit={ description }
            imageEdit={ image }
          />
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
