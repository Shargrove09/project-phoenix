import { createContext } from "react";

export const SearchContext = createContext({
  animeData: [],
  singleData: {},
  search: () => {},
  searchById: () => {},
  setData: () => {},
  setSingle: () => {},
});
