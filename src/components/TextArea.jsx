import { useEffect, useRef, useContext, useMemo, useCallback } from 'react';
import { TextArea as CoreTextArea, Button } from '@svar-ui/react-core';
import UserIcon from './messages/UserIcon.jsx';
import { context } from '@svar-ui/react-core';
import { useWritableProp } from '@svar-ui/lib-react';
import './TextArea.css';

function TextArea(props) {
  const {
    focus = false,
    buttonLabel = 'Send',
    flow = false,
    value: valueProp,
    author,
    onPost,
  } = props;

  const [value, setValue] = useWritableProp(valueProp || '');

  const textareaRef = useRef(null);
  const areaRef = useRef(null);
  const onClickRef = useRef(null);

  const i18n = useContext(context.i18n);
  const _ = useMemo(() => i18n.getGroup('comments'), [i18n]);

  onClickRef.current = useCallback(
    (value) => {
      if (!value) return;
      onPost && onPost({ value });
      setValue('');
      if (areaRef.current) areaRef.current.focus();
    },
    [onPost, value],
  );

  useEffect(() => {
    if (!textareaRef.current) return;
    areaRef.current = textareaRef.current.querySelector('textarea');
    if (focus && areaRef.current) areaRef.current.focus();

    areaRef.current.onkeydown = (ev) => {
      if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        onClickRef.current(value);
      }
    };
  }, []); // onMount equivalent

  return (
    <div
      className={`wx-v2rD0VHO wx-comments-textarea${flow ? ' wx-flow' : ''}`}
      data-focus="yes"
      ref={textareaRef}
    >
      <div className="wx-v2rD0VHO wx-textarea-wrapper">
        {author ? (
          <div className="wx-v2rD0VHO wx-textarea-avatar">
            <UserIcon data={author} />
          </div>
        ) : null}
        <CoreTextArea
          placeholder={_('Add a comment...')}
          value={value}
          onChange={({ value }) => setValue(value)}
        />
      </div>
      <div className="wx-v2rD0VHO wx-textarea-bottombar">
        <Button type="primary" onClick={() => onClickRef.current(value)}>
          {_(buttonLabel)}
        </Button>
      </div>
    </div>
  );
}

export default TextArea;
