import React from "react";
import { Anime } from "../../common/Anime";
import { Typography } from "@mui/material";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

// CSS handled in SingleAnime.scss

interface Props {
  relations: [
    {
      relation: string;
      entry: [
        {
          mal_id: number;
          type: string;
          name: string;
          url: string;
        }
      ];
    }
  ];
}

const RelatedAnimeSection = (props: Props) => {
  const { relations } = props;
  const { searchById, setSingle } = useSearchContext();
  const navigate = useNavigate();

  const handleRelationEntryClick = async (malID: string) => {
    const relationResult = await searchById(malID);
    setSingle(relationResult.data);
    localStorage.setItem("singleData", JSON.stringify(relationResult.data));
    navigate("/single-view");
  };

  return (
    <div>
      {relations?.map((relation) => (
        <>
          <div className="singleAnime__related_entry_container">
            <Typography
              variant={"h6"}
              sx={{
                fontSize: "16px",
                margin: "0px 8px 20px 0px",
              }}
            >
              {relation.relation}:{" "}
            </Typography>
            <div className="singleAnime__related_entry_group">
              {relation.entry.map((entry, index) =>
                entry.type === "anime" ? (
                  <span
                    className="singleAnime__related_entry singleAnime__related_entry_anime"
                    onClick={() =>
                      handleRelationEntryClick(entry.mal_id.toString())
                    }
                    key={entry.mal_id}
                  >
                    {entry.name}
                    {index < relation.entry.length - 1 && ","}
                  </span>
                ) : (
                  <span
                    className="singleAnime__related_entry singleAnime__related_entry_non_anime"
                    onClick={() => console.log("Non - Anime pages coming soon")}
                    key={entry.mal_id}
                  >
                    {entry.name}
                    {index < relation.entry.length - 1 && ","}
                  </span>
                )
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default RelatedAnimeSection;
