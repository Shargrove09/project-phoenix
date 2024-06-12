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
import { Anime } from "../common/Anime";

interface SearchContextValue {
  animeData: Anime[];
  singleData: Anime | null;
  search: (searchterm: any) => Promise<any>;
  searchById: (searchId: any) => Promise<any>;
  searchTerm: string;
  setSingle: (data: any) => void;
  setAnimeData: React.Dispatch<React.SetStateAction<Anime[]>>;
}

interface Props {
  children: React.ReactNode;
}

const SearchContext = createContext<SearchContextValue>({
  animeData: [],
  singleData: null,
  search: async (searchTerm) => ({}),
  searchById: async (searchId) => ({}),
  searchTerm: "",
  setSingle: (data) => {},
  setAnimeData: () => {},
});

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [animeData, setAnimeData] = useState([]);
  const [singleData, setSingleData] = useState<Anime>();
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
        singleData: singleData || null,
        search,
        searchById,
        setAnimeData: setAnimeData as React.Dispatch<React.SetStateAction<never[] | Anime[]>>,
        setSingle,
        searchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);