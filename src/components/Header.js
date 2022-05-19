import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  }

  async componentDidMount() {
    const dados = await getUser();
    this.setState({ name: dados.name });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading === true ? (
          <Carregando />
        ) : (
          <nav data-testid="header-user-name">{ name }</nav>
        )}
      </header>
    );
  }
}

export default Header;
