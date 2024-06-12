export interface Friend { 
  about: string; 
  birthday: string; 
  external: any; // Not sure what this holds 
  favorites: any; // Go Back and finish 
  gender: string; 
  images: {jpg: {image_url: string; }, webp: {image_url: string; }}; 
  joined: string; 
  last_online: string; 
  location: string; 
  mal_id: number; 
  statistics: {
    anime: {
      completed: number; 
      days_watched: number; 
      dropped: number; 
      episodes_watched:number; 
      mean_score: number; 
      on_hold: number; 
      plan_to_watch: number; 
      rewatched: number; 
      total_entries: number; 
      watching: number;
    }
    manga: { 
      chapters_read: number; 
      completed: number; 
      days_read: number; 
      dropped: number; 
      mean_score: number; 
      on_hold: number; 
      plan_to_read: number; 
      reading: number; 
      reread: number; 
      total_entries: number; 
      volumes_read: number; 
    }
  }
  updates: any; // Not sure 
  url: string; 
  username: string; 

}