import React, { useEffect } from 'react'
import {useState} from 'react'
import { likeMovie } from '../services/likeService';
import { useNavigate } from 'react-router-dom';
const Liked = () => {
    const navigate = useNavigate();
    const [movieFetchedData, setMovieFetchedData] = useState([])
    const [showFetchedData, setShowFetchedData] = useState([])
    const likedMovieIds = JSON.parse(localStorage.getItem('movieIds')) || [];
    const likedShowIds = JSON.parse(localStorage.getItem('showIds')) || [];
    const [flag, setFlag] = useState(true);
    //handles click on movies tile
    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };
    
    //handles click on movies tile
    const handleShowClick = (id) => {
        navigate(`/tvShows/${id}`);
    };
    //gets liked show data when show Btn is clicked
    const getShowData = async ()=>{
        // console.log("hey")
        for (const showIds of likedShowIds) {
            try{
                const response = await fetch(`https://api.themoviedb.org/3/tv/${showIds}?api_key=${import.meta.env.VITE_API_KEY}`);
                const showData = await response.json();
                setShowFetchedData(prev => [showData, ...prev]);
                console.log(`Fetched and added movie with ID ${showId}`);
            }
            catch(err){
                console.log(err.message);
            }
        };
    }

    //gets the movie data of liked/bookmarked movies stored in local storage
    const getData =async ()=>{
        for (const movieId of likedMovieIds) {
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`);
                const movieData = await response.json();
                // console.log(movieData); // Handle or display movie data
                setMovieFetchedData(prev => [movieData, ...prev]);
                // console.log(`Fetched and added movie with ID ${movieId}`);
            }
            catch(err){
                console.log(err.message);
            }
        };
    }
    // if(likedMovieIds.length <=0) return (<div className='w-full h-screen bg-black text-zinc-500 text-2xl font-semibold px-12 py-4'>No Liked Movies here ...</div>)
  useEffect(()=>{
    getData();
    getShowData();
  },[])  
  return (
    <div className='bg-black w-full min-h-screen text-white'>
        <div className='flex gap-5 items-center justify-center pt-12'>
            <button className={`${flag ? "text-sky-500":"text-white-500"} font-medium text-2xl hover:scale-105 duration-200`} onClick={()=>setFlag(value=>!value)}  >Movies</button>
            <button className={`${flag ? "text-white-500":"text-sky-500"} font-medium text-2xl hover:scale-105 duration-200`} onClick={()=>setFlag(value=>!value)}>Shows</button>
        </div>
        {flag ?
        (<div>
            <div className="list mt-2p pb-12 flex flex-wrap justify-center">
                {movieFetchedData.map((movie,index)=>{
                    return(
                        <button key={index} onClick={() => handleMovieClick(movie.id)} style={{
                            backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
                        }} className={`border-none text-white rounded-lg flex items-end border-2 m-4 w-1/5 h-[50vh] bg-cover bg-center card hover:scale-105 ease-in duration-200 hover:shadow-md hover:shadow-sky-500/50`}>
                            <div className="info px-4">
                                <div className="ori_title mb-2 text-3xl font-bold">
                                    {movie.title}
                                </div>
                                <div className="data px-4 text-zinc-400 text-sm">
                                    {movie.release_date}
                                </div>
                                <div className="overview">
                                    {/* {movie.overview} */}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>):
        (<div>
            <div className="list mt-2p pb-12 flex flex-wrap justify-center">
                {showFetchedData.map((show,index)=>{
                    return(
                        <button key={index} onClick={() => handleShowClick(show.id)} style={{
                            backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${show.poster_path}')`,
                        }} className={`border-none text-white rounded-lg flex items-end border-2 m-4 w-1/5 h-[50vh] bg-cover bg-center card hover:scale-105 ease-in duration-200 hover:shadow-md hover:shadow-sky-500/50`}>
                            <div className="info px-4">
                                <div className="ori_title mb-2 text-3xl font-bold">
                                    {show.original_name}
                                </div>
                                <div className="data px-4 text-zinc-400 text-sm">
                                    {show.first_air_date}
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>)}
    </div>
  )
}

export default Liked