import { useState, useContext } from 'react';
import api from '../api';
import AuthContext from '../context/context';
import { baseURL } from '../api';

const CreateLink = () => {
  const [link, setLink] = useState('');
  const { token } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [short, setShort] = useState('');
  const [target, setTarget] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    api
      .post('squeeze', null, {
        params: { link },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setLink('');
        setShort(`${baseURL}/s/${data.short}`);
        setTarget(data.target);
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
          value={link}
          onChange={e => {
            setErrors([]);
            setLink(e.target.value);
          }}
          required
        />

        <button type='submit'>Создать линку</button>
      </form>
      {short && (
        <>
          <p>
            Вы успешно создали ссылку <a href={short} target="_blank" rel="noreferrer">{short}</a>
          </p>
          <p>
            Редирект на <a href={target} target="_blank" rel="noreferrer">{target}</a>
          </p>
        </>
      )}
      {errors.map(err => (
        <p className='error' key={err}>
          {err}
        </p>
      ))}
    </div>
  );
};

export default CreateLink;
