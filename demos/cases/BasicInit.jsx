import { useState, useMemo } from 'react';
import { Segmented } from '@svar-ui/react-core';
import { Comments } from '../../src/index';
import { getData } from '../data';
import './BasicInit.css';

export default function BasicInit() {
  const { data, users } = useMemo(() => getData(), []);
  const options = useMemo(
    () => [
      { label: 'Bubbles', id: 'bubbles' },
      { label: 'Flow', id: 'flow' },
    ],
    [],
  );

  const [render, setRender] = useState('flow');

  return (
    <>
      <div className="wx-DwEL91Wl toolbar">
        <Segmented
          value={render}
          options={options}
          onChange={({ value }) => setRender(value)}
        />
      </div>
      <div style={{ margin: '20px', maxWidth: '700px', marginTop: '40px' }}>
        <Comments
          key={render}
          focus={true}
          value={data}
          users={users}
          activeUser={1}
          render={render}
        />
      </div>
    </>
  );
}
