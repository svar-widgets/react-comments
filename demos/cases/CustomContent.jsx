import { useMemo } from 'react';
import { Comments } from '../../src/index';
import { getData } from '../data';
import MessageRenderer from '../custom/MessageRenderer.jsx';
import ContentRenderer from '../custom/ContentRenderer.jsx';

import './CustomContent.css';

export default function BasicInit() {
  const { data, users } = useMemo(() => {
    const temp = getData();
    temp.data.forEach((d) => {
      d.content = d.content.replace('Alice', '@[Alice](user:1)');
    });
    return temp;
  }, []);

  return (
    <>
      <div
        className="custom-comments"
        style={{ margin: '20px', maxWidth: '700px', marginTop: '40px' }}
      >
        <Comments
          value={data}
          users={users}
          activeUser={1}
          render={MessageRenderer}
          format={ContentRenderer}
        />
      </div>
    </>
  );
}
