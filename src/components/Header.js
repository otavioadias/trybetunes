import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    name: '',
    img: '',
    loading: true,
  }

  async componentDidMount() {
    const dados = await getUser();
    this.setState({ name: dados.name, img: dados.image });
    this.setState({ loading: false });
  }

  render() {
    const { name, loading, img } = this.state;
    return (
      <header
        className="flex flex-row-reverse gap-10 justify-around
         bg-black min-w-full text-white"
        data-testid="header-component"
      >
        {loading === true ? (
          <Carregando />
        ) : (
          <div className="flex gap-5 items-center">
            <img
              data-testid="profile-image"
              src={ img }
              alt={ name }
              width="50"
              className="rounded-full"
            />
            <Link
              data-testid="header-user-name"
              to="/profile"
              className="bg-white
              text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl
              hover:shadow-zinc-700/80 cursor-pointer"
            >
              { name }
            </Link>
            <Link
              to="/"
              className="bg-white
              text-black shadow-lg max-h-10 py-2 px-4 rounded-2xl
              hover:shadow-zinc-700/80 cursor-pointer"
            >
              Logout
            </Link>
          </div>
        )}
        <nav
          className="flex justify-around mt-5 mb-5
         bg-black text-zinc-300 gap-20
         font-medium"
        >
          <Link
            data-testid="link-to-search"
            to="/search"
            className="hover:text-white
            hover:font-semibold hover:cursor-pointer"
          >
            Search

          </Link>
          <Link
            data-testid="link-to-favorites"
            to="/favorites"
            className="hover:text-white
            hover:font-semibold hover:cursor-pointer"
          >
            Favorites

          </Link>
          <Link
            data-testid="link-to-profile"
            to="/profile"
            className="hover:text-white
            hover:font-semibold hover:cursor-pointer"
          >
            Profile

          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
