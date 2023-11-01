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
  searchTerm: string;
  setSingle: (data) => void;
  setAnimeData: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Props {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextValue>(undefined);

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [animeData, setAnimeData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Stores single anime data if single anime is clicked
  const setSingle = (data: any) => {
    setSingleData(data);
  };

  // Search for an anime by general search term
  const search = async (searchTerm: string) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=20&sfw`
    );
    setSearchTerm(searchTerm);
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
      value={{
        animeData,
        singleData,
        search,
        searchById,
        setAnimeData,
        setSingle,
        searchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
