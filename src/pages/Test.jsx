import React from 'react'
import axios from 'axios';

const Test = () => {
  const handleGenre=async (id)=>{
    // console.log(id);
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}&sort_by=popularity.desc&language=en-US&page=3`)
    const data = await response.json();
    console.log(data);
  }
  handleGenre(28);
return(
    <div className='text-white text-4xl font-semibold p-12 bg-zinc-900 w-full h-screen'>
        Test Route Shhhh....
    </div>
)
}

export default Test