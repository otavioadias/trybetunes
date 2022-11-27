import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  state = {
    name: 'Otávio Azevedo Dias',
    email: 'email@test.com',
    img: 'url-to-image',
    description: 'Lorem ipsum',
    loading: true,
  }

  async componentDidMount() {
    const dados = await getUser();
    this.setState({
      name: dados.name,
      img: dados.image,
      description: dados.description,
      email: dados.email,
    });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading, email, img, description } = this.state;
    const { save, nameEdit, emailEdit, imageEdit, descriptionEdit } = this.props;
    return (
      <div>
        <Header />
        <div data-testid="page-profile">Profile</div>
        {loading === true ? (
          <Carregando />
        ) : (
          <main>
            <img
              data-testid="profile-image"
              src={ !save || save === false ? img : imageEdit }
              alt={ name }
            />
            <section data-testid="user-name">
              { !save || save === false ? name : nameEdit }
            </section>
            <section data-testid="user-email">
              { !save || save === false ? email : emailEdit }
            </section>
            <section data-testid="user-description">
              { !save || save === false ? description : descriptionEdit }
            </section>
            <Link to="/profile/edit">Editar perfil</Link>
          </main>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  save: PropTypes.bool.isRequired,
  nameEdit: PropTypes.string.isRequired,
  emailEdit: PropTypes.string.isRequired,
  descriptionEdit: PropTypes.string.isRequired,
  imageEdit: PropTypes.string.isRequired,
};

export default Profile;
