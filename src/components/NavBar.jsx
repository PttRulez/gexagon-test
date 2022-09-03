import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/context';

const NavBar = () => {
  const {token} = useContext(AuthContext)
  return (
    <nav className='nav'>
      <NavLink to='/'  >Все линки</NavLink>
      {token && <NavLink to='/my-links' >Мои линки</NavLink>}
      {token && <NavLink to='/create-link' >Создать линку</NavLink>}
      {!token && <NavLink to='/register' >Регистрация</NavLink>}
      {!token && <NavLink to='/login' >Логин</NavLink>}
    </nav>
  )
}

export default NavBar