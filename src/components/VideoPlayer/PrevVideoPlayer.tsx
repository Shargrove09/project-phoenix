import ReactPlayer from "react-player/youtube";

interface Props {
  height: number;
  width: number;
  youtubeURL: string;
}

const PrevVideoPlayer = (props: Props) => {
  const { height, width, youtubeURL } = props;

  const create_youtube_url = (url: string) => {
    const base_url = "https://www.youtube.com/watch?v=";
    return base_url + url;
  };

  return (
    <ReactPlayer
      controls={true}
      height={height}
      url={create_youtube_url(youtubeURL)}
      width={width}
    />
  );
};

export default PrevVideoPlayer;
