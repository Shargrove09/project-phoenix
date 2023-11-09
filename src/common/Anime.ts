//TODO: finish definting types for attributes
export interface Anime {
  aired: {}; 
  airing: boolean; 
  approved: boolean; 
  background: any; 
  broadcast: {}; 
  demographics:{}[]; 
  duration: string; 
  episodes: number; 
  explicit_genres: [];
  favorites: number; 
  genres: {}[];
  images: {jpg: {image_url: string; small_image_url: string; large_image_url: string}, png: {image_url: string; small_image_url: string; large_image_url: string}}; 
  licesnsors: {}[]
  mal_id: number; 
  members: number; 
  popularity: number; 
  producers: {}[]; 
  rank: number; 
  rating: string; 
  score: number; 
  scored_by: number; 
  season: any; 
  source: string; 
  status: string; 
  studios: {}[]; 
  synopsis: string; 
  themes: any[]; 
  title: string; 
  title_english: string; 
  title_japanese: string; 
  title_synonyms: string[], 
  titles: {type: string, title: string}[]
  trailer: {}, 
  url: string; 
  year: number; 

}