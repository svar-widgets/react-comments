import { useMemo } from "react";
import Message from "./messages/Common.jsx";
import "./Messages.css";

function Messages({ data, render = "blocks", format, author, edit, onPost, onCancel }) {
  const css = useMemo(() => (typeof render === "string" ? render : "blocks"), [render]);

  return (
    <div className={`wx-6HAxmtjJ wx-messages wx-${css}`}>
      {data.map((message) => (
        <Message
          key={message.id}
          text={message.content}
          date={message.date}
          author={message.author}
          owned={message.author.id === author.id ? message.id : null}
          render={render}
          edit={edit}
          format={message.format || format}
          onPost={onPost}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}

export default Messages;