import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useContext,
} from 'react';
import Messages from './Messages.jsx';
import TextArea from './TextArea.jsx';
import { ActionMenu } from '@svar-ui/react-menu';
import { uid } from '@svar-ui/lib-state';
import { dateToString } from '@svar-ui/lib-dom';
import { context } from '@svar-ui/react-core';
import { useWritableProp } from '@svar-ui/lib-react';
import { formatContext as FormatContext } from '../context.js';
import './Layout.css';

export default function Layout(props) {
  let {
    onAction,
    onChange,
    readonly = false,
    render = 'flow',
    format = 'text',
    users: rawUsers,
    data: dataProp,
    activeUser,
    focus = false,
  } = props;

  const lang = useContext(context.i18n);
  const { calendar, comments, formats } = lang.getRaw();
  const _ = lang.getGroup('comments');

  const dateFormatter = useMemo(
    () => dateToString(comments.dateFormat || formats.dateFormat, calendar),
    [calendar, comments, formats],
  );

  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const [rawData, setRawData] = useWritableProp(dataProp);

  useEffect(() => {
    setValue('');
    setEdit(null);
  }, [rawData]);

  const unknownUser = { id: 0, name: _('Unknown'), color: 'hsl(0, 0%, 85%)' };

  const users = useMemo(() => {
    if (!rawUsers) return [];
    return rawUsers.map((u) => {
      if (!u.color)
        return {
          ...u,
          color: 'hsl(' + getColor(u.id + u.name) + ', 100%, 85%)',
        };
      return u;
    });
  }, [rawUsers]);

  const author = useMemo(() => {
    if (typeof activeUser === 'object') return activeUser;
    const a = users.find((u) => u.id === activeUser) || unknownUser;
    if (a) return a;
    return {
      id: activeUser || -1,
      name: _('Me'),
      color: 'hsl(225, 76%, 67%)',
    };
  }, [activeUser, users, _]);

  const data = useMemo(() => {
    if (!rawData) return [];
    return rawData.map((d) => {
      if (typeof d.author === 'object') return d;
      const user = users ? users.find((u) => u.id === d.user) : null;
      return {
        ...d,
        author: user || unknownUser,
      };
    });
  }, [rawData, users]);

  function getColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (hash % 60) * 6;
  }

  function add(content) {
    const comment = {
      id: uid(),
      content,
      author,
      user: author.id,
      date: new Date(),
    };

    const nextValue = [...data, comment];
    setRawData(nextValue);
    if (onChange) {
      const res = onChange({ value: nextValue, comment, action: 'add' });
      if (res && typeof res === 'object') {
        if (res.then) {
          res.then((data) => {
            updateAfter(comment.id, data);
          });
        } else {
          updateAfter(comment.id, res);
        }
      }
    }
  }

  function updateAfter(id, data) {
    const index = rawData ? rawData.findIndex((d) => d.id === id) : -1;
    if (index === -1) return;
    const copy = [...rawData];
    copy[index] = { ...rawData[index], ...data };
    setRawData(copy);
  }

  function remove(id) {
    const nextValue = (rawData || []).filter((d) => d.id !== id);
    setRawData(nextValue);
    onChange && onChange({ value: nextValue, id, action: 'delete' });
  }

  function update(id, content) {
    let comment;
    const nextValue = (rawData || []).map((d) => {
      if (d.id === id) {
        comment = { ...d, content };
        return comment;
      } else return d;
    });
    setRawData(nextValue);
    onChange && onChange({ value: nextValue, id, action: 'update', comment });
  }

  function cancelUpdate() {
    setEdit(null);
  }

  function handleActionMenu(ev) {
    const { context, action } = ev;

    if (!action) return;

    onAction && onAction({ action: 'menu-clicked' });

    switch (action.id) {
      case 'edit-comment':
        setEdit(context);
        break;
      case 'delete-comment':
        remove(context);
        break;
      default:
        break;
    }
  }

  const menuItems = [
    {
      id: 'edit-comment',
      text: _('Edit'),
      icon: 'wxi-edit-outline',
    },
    {
      id: 'delete-comment',
      text: _('Delete'),
      icon: 'wxi-delete-outline',
    },
  ];

  const menu = useRef(null);
  const showMenu = useCallback(
    (ev) => {
      if (menu.current && typeof menu.current.show === 'function') {
        menu.current.show(ev);
      }
    },
    [menu],
  );

  return (
    <FormatContext.Provider
      value={{
        dateStr: (date) => dateFormatter(date),
      }}
    >
      <div className="wx-8ZGHQX6e wx-comments-list">
        <ActionMenu
          at={'bottom'}
          ref={menu}
          options={menuItems}
          resolver={(item) => item}
          dataKey="commentMenuId"
          onClick={handleActionMenu}
        />
        <div className="wx-8ZGHQX6e wx-list" onClick={showMenu}>
          <Messages
            author={author}
            render={render}
            data={data}
            format={format}
            edit={edit}
            onPost={(ev) => update(edit, ev.value)}
            onCancel={cancelUpdate}
          />
        </div>
        {!readonly && !edit && (
          <TextArea
            author={author}
            flow={render === 'flow'}
            focus={focus}
            onPost={(ev) => add(ev.value)}
            buttonLabel={'Add'}
            value={value}
            onChange={({ value }) => setValue(value)}
          />
        )}
      </div>
    </FormatContext.Provider>
  );
}
