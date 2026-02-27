import axios from "axios";
import { data } from "react-router-dom";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_API
const PEXELS_KEY = import.meta.env.VITE_PEXELS_API
const TENOR_KEY = import.meta.env.VITE_TENOR_API

export async function fetchPhotos (query,page=1,per_page){
   const res = await axios.get("https://api.unsplash.com/search/photos",{
    params:{query,page,per_page},
    headers:{Authorization:`Client-ID ${UNSPLASH_KEY}`}

   })
   return res.data.results

}
export async function fetchVideos(query, per_page=15) {
    const res = await axios.get("https://api.pexels.com/videos/search",{
        params:{query, per_page},
        headers:{Authorization: PEXELS_KEY}
        
    })
    return res.data.videos
    
}

export async function fetchGIF(query, limit=20) {
    const res = await axios.get("https://tenor.googleapis.com/v2/search",{
        params:{q:query, key:TENOR_KEY, limit},
        headers:{Authorization: TENOR_KEY}
        
    })
    return res.data.results
    
}

