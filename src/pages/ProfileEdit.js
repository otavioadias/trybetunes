import React from 'react';
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

  async componentDidMount() {
    const dados = await getUser();
    this.setState({ name: dados.name });
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

  onSave = async () => {
    const { name, description, email, image } = this.state;
    this.setState({ save: true });
    await updateUser({ name, email, description, image });
  }

  render() {
    const { loading, name, description, email, image, disabled, save } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">Profile Edit</div>
        {loading === true ? (
          <Carregando />
        ) : (
          <main>
            <forms>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  data-testid="edit-input-name"
                  placeholder="Insira seu nome"
                  value={ name }
                  onChange={ this.onInputChange }
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
                />
              </label>
              <label htmlFor="description">
                Imagem:
                <input
                  type="text"
                  id="image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabled }
                onChange={ this.onInputChange }
                onClick={ this.onSave }
              >
                Salvar
              </button>
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
            </forms>
          </main>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
