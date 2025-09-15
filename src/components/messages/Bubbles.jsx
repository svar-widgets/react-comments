import { useContext } from "react";
import { formatContext } from "../../context.js";
import UserIcon from "./UserIcon.jsx";
import "./Bubbles.css";

function Bubbles({ owned, author, date, edit, children }) {
  const wxCommentsFormat = useContext(formatContext);
  const dateFormatter = wxCommentsFormat.dateStr;

  return (
    <div className={`wx-aluyyvxH wx-bubble ${owned ? "wx-owned" : ""}`}>
      <div className="wx-aluyyvxH wx-bubble-wrapper">
        <div className="wx-aluyyvxH wx-avatar">
          <UserIcon data={author} />
        </div>
        <div className="wx-aluyyvxH wx-main-bubble">
          <span className="wx-aluyyvxH wx-author-name">{author.name}</span>
          {owned ? (
            <div className="wx-aluyyvxH wx-agent-message">
              <div className="wx-aluyyvxH wx-message">
                {children}
                {edit !== owned ? (
                  <div className="wx-aluyyvxH wx-comment-date">{dateFormatter(date)}</div>
                ) : null}
              </div>
              <div className="wx-aluyyvxH wx-menu-icon" data-comment-menu-id={owned}>
                <i className="wx-aluyyvxH wx-icon wxi-dots-v"></i>
              </div>
            </div>
          ) : (
            <div className="wx-aluyyvxH wx-message">
              {children}
              <div className="wx-aluyyvxH wx-comment-date">{dateFormatter(date)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bubbles;