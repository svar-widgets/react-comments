import { useMemo, useState } from "react";
import { Segmented } from "@svar-ui/react-core";
import { Comments } from "../../src/index";
import { getMarkdownData } from "../data";
import "./MarkdownInit.css";

export default function MarkdownInit() {
  const { data, users } = useMemo(() => getMarkdownData(), []);
  const options = useMemo(
    () => [
      { label: "Bubbles", id: "bubbles" },
      { label: "Flow", id: "flow" },
    ],
    []
  );

  const [render, setRender] = useState("flow");

  return (
    <>
      <div className="wx-rRWpC939 toolbar">
        <Segmented
          value={render}
          options={options}
          onChange={({ value }) => setRender(value)}
        />
      </div>
      <div style={{ margin: "auto", maxWidth: "700px", marginTop: "40px" }}>
        <Comments
          key={render}
          value={data}
          users={users}
          activeUser={1}
          render={render}
          format={"markdown"}
        />
      </div>
    </>
  );
}