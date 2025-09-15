import { createContext } from 'react';

export const formatContext = createContext({
  dateStr: (v) => v.toString(),
});
