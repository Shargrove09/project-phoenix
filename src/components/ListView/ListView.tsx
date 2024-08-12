import React from "react";
import DetailedAnimeCard from "../DetailedAnimeCard/DetailedAnimeCard";

import "./ListView.scss";

interface Props {
  animeList: any;
}

const ListView = (props: Props) => {
  const { animeList } = props;

  return (
    <div className="listView__container">
      {animeList.map((animeData, index) => (
        <DetailedAnimeCard key={index} animeData={animeData} />
      ))}
    </div>
  );
};

export default ListView;