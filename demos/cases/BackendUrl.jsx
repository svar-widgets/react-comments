import { useEffect, useMemo, useState } from 'react';
import { RestURL } from '@svar-ui/lib-data-provider';
import { Comments } from '../../src/index';
import { getData } from '../data';

export default function BackendUrl() {
  const users = useMemo(() => getData().users, []);
  const loadURL = useMemo(
    () => 'https://master--svar-comments-go--dev.webix.io/comments-info/1',
    [],
  );
  const saveURL = useMemo(
    () =>
      new RestURL('https://master--svar-comments-go--dev.webix.io/comments/1'),
    [],
  );

  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch(loadURL)
      .then((r) => r.json())
      .then((d) => setValue(d));
  }, [loadURL]);

  return (
    <div style={{ margin: '20px', maxWidth: '700px', marginTop: '40px' }}>
      <Comments
        value={value}
        onChange={({ action, comment, id }) =>
          saveURL.save(action, comment, id)
        }
        activeUser={users[0]}
      />
    </div>
  );
}
