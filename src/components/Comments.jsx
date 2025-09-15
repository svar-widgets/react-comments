import { useState, useEffect, useCallback } from "react";
import Layout from "./Layout.jsx";
import { Locale } from "@svar-ui/react-core";
import { en } from "@svar-ui/comments-locales";
import { en as coreEn } from "@svar-ui/core-locales";

function Comments(allProps) {
  const { onData, onChange, value, ...props } = allProps;
  let [finalData, setFinalData] = useState([]);

  useEffect(() => {
    if (onData && value) {
      Promise.resolve(onData(value)).then((x) => setFinalData(x));
    } else {
      setFinalData(value || []);
    }
  }, [onData, value]);

  const handleOnChange = useCallback(
    (e) => {
      e.originalValue = value;
      return onChange && onChange(e);
    },
    [onChange, value]
  );

  return (
    <Locale words={{ ...coreEn, ...en }} optional={true}>
      <Layout data={finalData} {...props} onChange={handleOnChange}></Layout>
    </Locale>
  );
}

export default Comments;