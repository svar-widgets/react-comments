import { useState, useMemo } from 'react';
import { Segmented } from '@svar-ui/react-core';
import { RestURL } from '@svar-ui/lib-data-provider';
import { Comments } from '../../src/index';
import { getData } from '../data';
import './BackendResolve.css';

function BackendResolve() {
  const url = useMemo(
    () =>
      new RestURL('https://master--svar-comments-go--dev.webix.io/comments'),
    [],
  );
  const users = useMemo(() => getData().users, []);

  const [id, setId] = useState(1);
  const options = [
    { id: 1, label: 'Page 1' },
    { id: 2, label: 'Page 2' },
  ];

  return (
    <div>
      <div className="wx-ntGV3sif toolbar">
        <Segmented
          value={id}
          options={options}
          onChange={({ value }) => setId(value)}
        />
      </div>
      <div className="wx-ntGV3sif comments">
        <Comments
          url={url}
          value={id}
          onData={(v) => url.get(v)}
          onChange={({ action, comment, id, originalValue: v }) =>
            url.path(v).save(action, comment, id)
          }
          activeUser={1}
          users={users}
        />
      </div>
    </div>
  );
}

export default BackendResolve;
