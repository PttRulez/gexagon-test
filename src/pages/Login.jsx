import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import AuthContext from '../context/context';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate()
  const context = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    api
      .post(
        'login',
        new URLSearchParams({
          username: login,
          password: password,
        })
      )
      .then(res => {
        setToken(res.data.access_token);
        navigate('/');
      })
      .catch(err => {
        if (err.response.status === 400) {
          setErrors([err.response.data.detail]);
        } else if (err.response.status === 422) {
          const errors = err.response.data.detail.map(err => String(err.loc[1] + ' - ' + err.msg));
          setErrors(errors);
        }
      });
  };

  return (
    <div className='form-wrapper'>
      <form onSubmit={onSubmit} className='form'>
        <input
          value={login}
          onChange={e => {
            setErrors([]);
            setLogin(e.target.value);
          }}
          required
        />
        <input
          value={password}
          type='password'
          onChange={e => {
            setErrors([]);
            setPassword(e.target.value);
          }}
          required
        />
        <button type='submit'>Логин</button>
        {context.afterRegisterMessage && <p className='success'>{context.afterRegisterMessage}</p>}
        {errors.map(err => (
          <p className='error' key={err}>
            {err}
          </p>
        ))}
      </form>
    </div>
  );
};

export default Login;
