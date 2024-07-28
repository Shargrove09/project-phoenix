import { Text } from "@mantine/core";
import { useSearchContext } from "../../context/useSearchContext";
import { useNavigate } from "react-router-dom";
import { JikanResourceRelation } from "../../common/types";

// CSS handled in SingleAnime.scss

interface Props {
  relations: JikanResourceRelation[] | undefined;
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
          <div>
            <Text variant={"h6"}>{relation.relation}: </Text>
            <div>
              {relation.entry.map((entry, index) =>
                entry.type === "anime" ? (
                  <span
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
