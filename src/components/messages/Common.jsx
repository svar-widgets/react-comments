import { useMemo } from "react";
import TextArea from "../TextArea.jsx";
import { messages, formats } from "./index.js";

export default function Common({
  text,
  date,
  owned,
  render,
  format = "text",
  author,
  edit,
  onPost: onPost,
  onCancel: onCancel
}) {
  const BoxRender = useMemo(
    () => (typeof render === "string" ? messages[render] : render),
    [render]
  );

  const TextRender = useMemo(
    () => (typeof format === "string" ? formats[format] : format),
    [format]
  );

  return (
    <BoxRender owned={owned} edit={edit} author={author} date={date}>
      {edit && edit === owned ? (
        <TextArea focus={true} onPost={onPost} onCancel={onCancel} value={text} />
      ) : (
        <TextRender text={text} edit={edit} />
      )}
    </BoxRender>
  );
}