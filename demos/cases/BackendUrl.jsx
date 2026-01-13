import { useEffect, useMemo, useState } from 'react';
import { RestURL } from '@svar-ui/lib-data-provider';
import { Comments } from '../../src/index';
import { getData } from '../data';

export default function BackendUrl() {
  const users = useMemo(() => getData().users, []);
  const loadURL = useMemo(
    () => 'https://comments-backend.svar.dev/comments-info/1',
    [],
  );
  const saveURL = useMemo(
    () =>
      new RestURL('https://comments-backend.svar.dev/comments/1'),
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
