// OLD SEARCH CONTEXT

// import { createContext } from "react";

// export const SearchContext = createContext({
//   animeData: [],
//   singleData: {},
//   search: async (searchTerm) => ({ /* TODO: Set some default value */}),
//   searchById: async (searchId) => {},
//   setData: (data) => {},
//   setSingle: (data) => {},
// });

import React, { createContext, useContext, useState } from "react";

interface SearchContextValue {
  animeData: any[];
  singleData: {};
  search: (searchterm) => Promise<any>;
  searchById: (searchId) => Promise<any>;
  setData: (data) => void;
  setSingle: (data) => void;
}

interface Props {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextValue>(undefined);

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [animeData, setAnimeData] = useState([]);
  const [singleData, setSingleData] = useState({});

  // TODO: rename to setAnimeData to be descriptive
  // Stores all anime data
  const setData = (data) => {
    setAnimeData(data);
  };

  // Stores single anime data if single anime is clicked
  const setSingle = (data: any) => {
    setSingleData(data);
  };

  // Search for an anime by general search term
  const search = async (searchTerm: string) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20`
    );
    return await response.json();
  };

  const searchById = async (searchId: string) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${searchId}/full`
    );
    return await response.json();
  };

  return (
    <SearchContext.Provider
      value={{ animeData, singleData, search, searchById, setData, setSingle }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
