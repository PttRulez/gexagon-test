import { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/context';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()
  const context = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    api
      .post('register', null, {
        params: {
          username: login,
          password: password,
        },
      })
      .then(res => {
        context.afterRegisterMessage = `Вы успещно зарегистрировались под ником ${login}. Теперь можно залогинитсья и создать линку`;
        navigate('/login');
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
            setErrors([])
            setLogin(e.target.value);
          }}
          required
        />
        <input
          value={password}
          type='password'
          onChange={e => {
            setErrors([])
            setPassword(e.target.value);
          }}
          required
        />
        <button type='submit'>Зарегистрироваться</button>
        {errors.map(err => (
          <p className='error' key={err}>{err}</p>
        ))}
      </form>
    </div>
  );
};

export default Register;
