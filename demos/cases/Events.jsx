import { useState, useMemo, useCallback } from "react";
import { Comments } from "../../src/index";
import { getData } from "../data";
import "./Events.css";

function Events() {
  const { data, users } = useMemo(() => getData(), []);
  const [message, setMessage] = useState("");

  const trackChanges = useCallback(({ action, id, comment }) => {
    switch (action) {
      case "add":
        setMessage(`New comment was added (${new Date().getTime()})`);
        console.log(`New comment: "${comment.content}" was added `);
        break;
      case "update":
        setMessage(`Comment with id: ${id} was updated`);
        console.log(`Comment with id: ${id} was updated `);
        break;
      case "delete":
        setMessage(`Comment with id: ${id} was deleted`);
        console.log(`Comment with id: ${id} was deleted `);
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <div className="wx-5YqcEBWD message">{message}</div>
      <div>
        <div className="wx-5YqcEBWD wrapper">
          <Comments value={data} users={users} activeUser={1} onChange={trackChanges} />
        </div>
      </div>
    </>
  );
}

export default Events;