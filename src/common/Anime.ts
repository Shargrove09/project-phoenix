//TODO: finish definting types for attributes
// optional params are part of complete anime object
export interface Anime {
  aired: {from: string}; 
  airing: boolean; 
  approved: boolean; 
  background: any; 
  broadcast: {day: string, string: string; time: string; timezone: string}; 
  demographics:{}[]; 
  duration: string; 
  episodes: number; 
  explicit_genres: [];
  favorites: number; 
  genres: [{mal_id: string, type: string, name: string, url: string}];
  images: {jpg: {image_url: string; small_image_url: string; large_image_url: string}, png: {image_url: string; small_image_url: string; large_image_url: string}}; 
  licesnsors: {}[]
  mal_id: number; 
  members: number; 
  popularity: number; 
  producers: {}[]; 
  rank: number; 
  relations?: [{relation: string, entry: [{mal_id: number, type: string, name: string, url: string}]}] // TODO: Type Manga object and add union here
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
  trailer: {embed_url: string, images: { 
    image_url: string; 
    small_image_url: string; 
    medium_image_url: string; 
    large_image_url: string; 


  }, url: string, youtube_id: string}, 
  url: string; 
  year: number; 

}