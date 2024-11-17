import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Youtube from "react-youtube";
import axios from 'axios';
import { likeShow } from '../services/likeService';
import { CiBookmark } from "react-icons/ci";

const FullPgDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showCur, setShowCur  ] = useState(null);
    const [list, setList  ] = useState([]);
    const [videoId,setVideoId]=useState();
    const [flag,setFlag]=useState(false)

    //gets youtube video key from TMDB API
    const handleWatch=async (movie_id)=>{
        const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/tv/${movie_id}/videos`,
        params: {language: 'en-US'},
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`
        }
        };

        axios
        .request(options)
        .then(res => {
            // console.log(res.data.results); 
            setVideoId(res.data.results[0].key)})
        .catch(err => console.error(err));
            setFlag(value=>!value)
    }
    //handles click on movies tile
    const handleShowClick = (id) => {
        navigate(`/tvShows/${id}`);
    };

    //fills the tiles according to the selected movie genre
    const getShowsData= async(id)=>{
        setFlag(false);
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}&sort_by=popularity.desc&language=en-US&page=1`);
        const data = await response.json();
        // console.log(data)
        setList(data.results)
    }
    
    // Fetch tv show details from your API or data source
    const fetchMovie = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        // console.log(data)    
        setShowCur(data);
        getShowsData(data.genres[0].id);
    }

    useEffect(() => {
        fetchMovie();
    }, [id])
    if (!showCur) return <div className='p-36 text-4xl bg-black w-full h-screen text-white'>Not Available...</div>;

    return (
        <>
            <div className='bg-black'>
            {flag ?
                (
                    <div>
                        <Youtube 
                        className='px-36 py-8 rounded-lg' 
                        opts={{height:'650',width:'1200',
                        playerVars: {
                            // https://developers.google.com/youtube/player_parameters
                            autoplay: 1,
                            controls:0
                        },}} 
                        videoId={videoId}/>
                        <div className="info text-white">
                            <h1 className='px-24 text-4xl font-medium'>{showCur.original_name}</h1>
                            <h1 className='px-24 py-2 text-sm text-zinc-400'>{showCur.overview}</h1>
                        </div>
                    </div>
                ):
                (
                    <div className='p-2'>
                        <div
                            style={{
                                backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${showCur.backdrop_path}')`,
                                backgroundSize: "cover",         // Ensures the image covers the entire div
                                backgroundPosition: "center",     // Centers the image
                                backgroundRepeat: "no-repeat"
                            }}
                            className='rounded-xl px-12  flex justify-end items-start flex-col h-[51vh] xl:h-[91vh]'>
                            <div className='pb-6 w-full text-white'>
                                <div className='flex justify-between flex-col xl:flex-row items-center w-full'>
                                    <div>
                                        <h1 className='py-2 text-6xl  font-semibold'>{showCur.original_name}</h1>
                                    </div>
                                    <div className='flex gap-5 w-full justify-center md:justify-around xl:justify-end'>
                                        <div className='w-full xl:w-36'>
                                            <button className='bg-sky-500 mx-4 md:m-0 px-8 py-2 w-[100%] md:w-[80%] font-medium xl:text-lg rounded-md xl:hover:scale-105 duration-100' onClick={()=>handleWatch(showCur.id)}>Watch</button>
                                        </div>
                                        <div >
                                            <button className='bg-sky-500 px-2 py-2 font-medium text-2xl rounded-md hover:scale-105 duration-100' onClick={()=>{likeShow(showCur.id)}}><CiBookmark /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className='hidden xl:inline'>
                                    <div className="desc">
                                        <p className='text-zinc-400'>{showCur.overview}</p>
                                    </div>
                                    <div className='flex gap-10 pt-2 pb-12'>
                                        <p><strong>Release Date:</strong> {showCur.release_date}</p>
                                        <p><strong>Vote Average:</strong> {showCur.vote_average}</p>
                                        <p><strong>Popularity:</strong> {showCur.popularity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="list mt-2p pb-12 flex flex-wrap justify-center">
                    {list.map((movie,index)=>{
                        return(
                            <button key={index} onClick={() => handleShowClick(movie.id)} style={{
                                backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
                            }} className={`border-none text-white rounded-lg flex items-end border-2 m-4 w-3/4 md:w-1/3 xl:w-1/5 h-[50vh] bg-cover bg-center card hover:scale-105 ease-in duration-200 hover:shadow-md hover:shadow-sky-500/50`}>
                                <div className="info px-4">
                                    <div className="ori_title mb-2 text-3xl font-bold">
                                        {movie.original_name}
                                    </div>
                                    <div className="data px-4 text-zinc-400 text-sm">
                                        {movie.first_air_date}
                                    </div>
                                    <div className="overview">
                                        {/* {movie.overview} */}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                    
                </div>
            </div>
        </>
    )
}

export default FullPgDetails