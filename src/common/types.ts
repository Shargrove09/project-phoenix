// Undecided for common shared types file or seperate files
// Using for as storage for Jikan types
export interface JikanImages {
  jpg: JikanImagesCollection;
  webp?: JikanImagesCollection;
}

export interface JikanImagesCollection {
  image_url: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

export interface JikanResource {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanNamedResource {
  name: string;
  url: string;
}

export interface JikanResourceTitle {
  type: string;
  title: string;
}

export interface JikanResourcePeriod {
  from: string;
  to: string;
  prop: {
    form: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
    string: string;
  };
}

export interface JikanResourceRelation {
  relation: string;
  entry: JikanResource[];
}

// Anime-Video-Model-TS 
export interface AnimeVideos {
  promo: AnimePromoVideo[];
  episodes: AnimeEpisodeVideo[];
  music_videos: AnimeMusicVideo[];
}

export interface AnimePromoVideo {
  title: string;
  trailer: AnimeYoutubeVideo;
}

export interface AnimeYoutubeVideo {
  youtube_id: string;
  url: string;
  embed_url: string;
  images?: JikanImagesCollection;
}

export interface AnimeEpisodeVideo {
  mal_id: number;
  url: string;
  title: string;
  episode: string;
  images: JikanImages;
}

export interface AnimeMusicVideo {
  title: string;
  video: AnimeYoutubeVideo;
  meta: AnimeVideoMeta;
}

export interface AnimeVideoMeta {
  title: string;
  author: string;
}