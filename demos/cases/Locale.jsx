import React, { useState, useMemo } from 'react';
import { Locale, Segmented } from '@svar-ui/react-core';
import { Comments } from '../../src/index';
import { getData } from '../data';

import { de, cn } from '@svar-ui/comments-locales';
import { de as deCore, cn as cnCore } from '@svar-ui/core-locales';

import './Locale.css';

export default function Component() {
  const { data, users } = useMemo(() => getData(), []);

  const options = [
    { label: 'Bubbles', id: 'bubbles' },
    { label: 'Flow', id: 'flow' },
  ];

  const langs = [
    { id: 'en', label: 'EN' },
    { id: 'de', label: 'DE' },
    { id: 'cn', label: 'CN' },
  ];

  const [render, setRender] = useState('flow');
  const [lang, setLang] = useState('en');

  return (
    <>
      <div className="wx-vy98CjMq toolbar">
        <Segmented
          options={langs}
          value={lang}
          onChange={({ value }) => setLang(value)}
        />
        <Segmented
          options={options}
          value={render}
          onChange={({ value }) => setRender(value)}
        />
      </div>
      <div style={{ margin: '20px', maxWidth: '700px', marginTop: '40px' }}>
        <React.Fragment key={render}>
          {lang === 'de' ? (
            <Locale words={{ ...de, deCore }}>
              <Comments
                focus={true}
                value={data}
                users={users}
                activeUser={1}
                render={render}
              />
            </Locale>
          ) : lang === 'cn' ? (
            <Locale words={{ ...cn, cnCore }}>
              <Comments
                focus={true}
                value={data}
                users={users}
                activeUser={1}
                render={render}
              />
            </Locale>
          ) : (
            <Comments
              focus={true}
              value={data}
              users={users}
              activeUser={1}
              render={render}
            />
          )}
        </React.Fragment>
      </div>
    </>
  );
}
