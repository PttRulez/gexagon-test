import { useEffect, useContext, useMemo, useLayoutEffect } from 'react';
import api from '../api';
import AuthContext from '../context/context';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import { baseURL } from '../api';
import CopyIcon from '../components/ui/CopyIcon';

const LinksTable = () => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('desc_counter');
  const [short, setShort] = useState('');
  const [target, setTarget] = useState('');
  const [limitFilter, setLimitFilter] = useState(10);

  const [copiedId, setCopiedId] = useState(null);

  const location = useLocation();

  const bearerToken = useMemo(
    () => (location.pathname.includes('my-links') ? token : 'hello'),
    [location.pathname, token]
  );

  const copyLinkToClipBoard = link => {
    setCopiedId(link.id);
    navigator.clipboard.writeText(`${baseURL}/s/${link.short}`);
  };

  const limitFilterSubmit = e => {
    e.preventDefault();
    setOffset(0);
    setLimit(Number(limitFilter));
  };

  useLayoutEffect(() => {
    setLoading(true);
    api
      .get('statistics', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: {
          offset,
          order,
          limit,
        },
      })
      .then(res => {
        setLoading(false);
        setLinks(res.data);
      });
  }, [offset, order, bearerToken, limit]);

  useEffect(() => {
    setFilteredLinks(
      links.filter(link => {
        return (
          link.short.toLowerCase().includes(short.toLowerCase()) &&
          link.target.toLowerCase().includes(target.toLowerCase())
        );
      })
    );
  }, [short, target, links]);

  return loading ? (
    <Loader />
  ) : (
    <div className='links-wrapper'>
      <div className='filters'>
        <div>
          <input
            value={short}
            onChange={e => setShort(e.target.value)}
            placeholder='Короткая ссылка'
          />
          <input value={target} onChange={e => setTarget(e.target.value)} placeholder='Исходная' />
        </div>
        <form onSubmit={limitFilterSubmit} className='filters-limit'>
          <input
            value={limitFilter}
            onChange={e => setLimitFilter(e.target.value)}
            placeholder='Все'
          />
          <button>
            Линков
            <br />
            на стр
          </button>
        </form>
      </div>

      <table className='links-table'>
        <thead>
          <tr>
            <th>
              <p
                onClick={() => {
                  setOrder(order === 'asc_short' ? 'desc_short' : 'asc_short');
                }}
              >
                Короткая
              </p>
            </th>
            <th>
              <p
                onClick={() => {
                  setOrder(order === 'asc_target' ? 'desc_target' : 'asc_target');
                }}
              >
                Исходная ссылка
              </p>
            </th>
            <th
              onClick={() => {
                setOrder(order === 'desc_counter' ? 'asc_counter' : 'desc_counter');
              }}
            >
              <p>Посещения</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredLinks.map(link => (
            <tr key={link.short}>
              <td>
                {copiedId === link.id ? (
                  <span>Copied !</span>
                ) : (
                  <div>
                    <a href={`${baseURL}/s/${link.short}`} target='_blank' rel='noreferrer'>
                      {link.short}
                    </a>
                    <div onClick={() => copyLinkToClipBoard(link)}>
                      <CopyIcon />
                    </div>
                  </div>
                )}
              </td>
              <td>
                <a href={link.target} target='_blank' rel='noreferrer'>
                  {link.target}
                </a>
              </td>
              <td>
                <p>{link.counter}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='nav-buttons'>
        <button onClick={() => setOffset(prev => prev - limit)} disabled={offset === 0}>Back</button>
        <span>{offset/limit + 1}</span>
        <button onClick={() => setOffset(prev => prev + limit)} disabled={links.length === 0}>Forward</button>
      </div>
    </div>
  );
};

export default LinksTable;
