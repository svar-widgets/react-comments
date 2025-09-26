import { useMemo, useState, useCallback } from 'react';
import { Comments } from '../../src/index';
import { getData } from '../data';
import './CustomBackend.css';

function CustomBackend() {
  const stub = useMemo(() => getData(), []);
  const users = stub.users;

  const prev = useMemo(() => localStorage.getItem('--comments-demo-data'), []);
  const data = useMemo(
    () => (prev ? JSON.parse(prev) : stub.data),
    [prev, stub],
  );

  const [message, setMessage] = useState('');

  const callback = useCallback((action, obj) => {
    switch (action) {
      case 'add': {
        setMessage(
          `The message "${obj.comment.content}" was successfully added`,
        );
        break;
      }
      case 'delete': {
        setMessage(`The message was successfully deleted`);
        break;
      }
      case 'update': {
        setMessage(`The message was successfully updated`);
        break;
      }
      default:
        break;
    }
    localStorage.setItem('--comments-demo-data', JSON.stringify(obj.value));
  }, []);

  return (
    <>
      <div className="wx-Dcb9nEfb message">{message}</div>
      <div>
        <div className="wx-Dcb9nEfb comments">
          <Comments
            value={data}
            onChange={(e) => callback(e.action, e)}
            users={users}
            activeUser={1}
          />
        </div>
      </div>
    </>
  );
}

export default CustomBackend;
