import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Youtube from "react-youtube";

const FullPgDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieCur, setMovieCur] = useState(null);
    const [list, setList] = useState([]);
    const [providers, setProviders] = useState([]);
    const [videoId, setVideoId] = useState();
    const [flag, setFlag] = useState(false);
    //get list of providers where we can watch full movie
    const getProvidersMovie = async (movie_id) => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/533535/watch/providers',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`
            }
        };

        const data = await axios
            .request(options)
            .then(res => {
                console.log(res.data);
                setProviders(res.data.results.IN.buy)
            })
            .catch(err => console.error(err));
        // console.log(providers)
    }
    //get movie key from TMDB API for youtube
    const handleWatch = async (movie_id) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
            params: { language: 'en-US' },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`

            }
        };

        axios
            .request(options)
            .then(res => { console.log(res.data); setVideoId(res.data.results[0].key) })
            .catch(err => console.error(err));
        setFlag(value => !value)
    }

    //handles click on movies tile
    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    //fills the tiles according to the selected movie genre
    const getMoviesData = async (id) => {
        setFlag(false);
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}&sort_by=popularity.desc&language=en-US&page=1`);
        const data = await response.json();
        // console.log(data)
        setList(data.results)
    }

    // Fetch movie details from your API or data source
    const fetchMovie = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        console.log(data)
        setMovieCur(data);
        getMoviesData(data.genres[0].id);
        getProvidersMovie(data.genres[0].id);
    }
    // console.log(providers[0].provider_name)
    //fetch similar movies from the page movie genre
    useEffect(() => {
        fetchMovie();
    }, [id])
    // console.log(videoId)
    if (!movieCur) return <div className='p-36 text-4xl bg-black w-full h-screen text-white'>Not Available...</div>;

    return (
        <>
            <div className='bg-black'>
                {flag ?
                    (<div>
                        <Youtube
                            className='px-36 py-8 rounded-lg'
                            opts={{
                                height: '720', width: '1200',
                                playerVars: {
                                    // https://developers.google.com/youtube/player_parameters
                                    autoplay: 1,
                                    controls: 0
                                },
                            }}
                            videoId={videoId} />
                        <div className="info text-white">
                            <h1 className='px-24 text-4xl font-medium'>{movieCur.title}</h1>
                            <h1 className='px-24 py-2 text-sm text-zinc-400'>{movieCur.overview}</h1>
                        </div>
                    </div>) :
                    (
                        <div className='p-2'>
                            <div
                                style={{
                                    backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${movieCur.backdrop_path}')`,
                                    backgroundSize: "cover",         // Ensures the image covers the entire div
                                    backgroundPosition: "center",     // Centers the image
                                    backgroundRepeat: "no-repeat"
                                }}
                                className='rounded-xl px-12  flex justify-end items-start flex-col h-[91vh]'>
                                <div className='pb-6 w-full text-white'>
                                    <div className='flex justify-between items-center w-full'>
                                        <div>
                                            <h1 className='py-2 text-6xl  font-semibold'>{movieCur.title}</h1>
                                        </div>
                                        <div>
                                            <button className='bg-sky-500 px-8 py-2 font-medium text-lg rounded-md hover:scale-105 duration-100' onClick={() => handleWatch(movieCur.imdb_id)}>Watch</button>
                                        </div>
                                    </div>
                                    <div className="desc">
                                        <p className='text-zinc-400'>{movieCur.overview}</p>
                                    </div>
                                    <div className='flex gap-10 pt-2 pb-2'>
                                        <p><strong>Release Date:</strong> {movieCur.release_date}</p>
                                        <p><strong>Vote Average:</strong> {movieCur.vote_average}</p>
                                        <p><strong>Popularity:</strong> {movieCur.popularity}</p>
                                    </div>
                                    <div className="providers pb-12 flex gap-4  ">
                                        <p>Watch on :</p>
                                        {providers.map((provider, index) => {
                                            return (
                                                <div>
                                                    <div className="name">{provider.provider_name}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                <div className="p-4 rounded movie-detail bg-black-900 w-full text-white">
                </div>
                <div className="list mt-2p pb-12 flex flex-wrap justify-center">
                    {list.map((movie, index) => {
                        return (
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
            </div>
        </>
    )
}

export default FullPgDetails