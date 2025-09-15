import { useMemo } from "react";
import { getContrastingColor } from "../../helpers/colors";
import "./UserIcon.css";

function UserIcon({
  data = {
    name: "",
    avatar: "",
    color: "",
  },
  noTransform = false,
  size = "small",
  border = true,
}) {
  const firstLetters = useMemo(
    () =>
      data.name
        .split(" ")
        .map((name) => name[0])
        .join(""),
    [data.name]
  );

  const style = useMemo(
    () => (data.color ? { background: data.color } : undefined),
    [data.color]
  );

  const css = useMemo(
    () =>
      data.color
        ? `wx-comments-avatar-color-${getContrastingColor(data.color)}`
        : "",
    [data.color]
  );

  return (
    <div
      className={`wx-cyzBpibr wx-user wx-${size} ${css} ${border ? "wx-border" : ""}`}
      style={style}
    >
      {data.avatar ? (
        <img src={data.avatar} alt={data.name} />
      ) : noTransform ? (
        data.name
      ) : (
        firstLetters
      )}
    </div>
  );
}

export default UserIcon;