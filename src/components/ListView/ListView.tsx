import React from "react";
import DetailedAnimeCard from "../DetailedAnimeCard/DetailedAnimeCard";

import "./ListView.scss";

interface Props {
  animeList: any;
}

const ListView = (props: Props) => {
  const { animeList } = props;

  console.log("animeList", animeList);

  return (
    <div className="dal__container">
      <DetailedAnimeCard animeData={animeList[0]} />
    </div>
  );
};

export default ListView;
