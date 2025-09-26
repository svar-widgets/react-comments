import { useContext } from 'react';
import { formatContext } from '../../context.js';
import UserIcon from './UserIcon.jsx';
import './Flow.css';

export default function Flow(props) {
  const { owned, author, date, edit, children } = props;

  const dateFormatter = useContext(formatContext).dateStr;

  return (
    <div className={`wx-N2LqQbZL wx-flow${owned ? ' wx-owned' : ''}`}>
      <div className="wx-N2LqQbZL wx-flow-toolbar">
        <UserIcon data={author} />
        <span className="wx-N2LqQbZL wx-author-name">{author.name}</span>
        {owned && owned !== edit && (
          <div
            className="wx-N2LqQbZL wx-menu-icon"
            data-comment-menu-id={owned}
          >
            <i className="wx-N2LqQbZL wx-icon wxi-dots-v"></i>
          </div>
        )}
      </div>
      <div className="wx-N2LqQbZL wx-comment-date">{dateFormatter(date)}</div>
      <div className="wx-N2LqQbZL wx-message">{children}</div>
    </div>
  );
}
