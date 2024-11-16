import React,{useEffect,useState} from 'react'
import { IoOptions } from "react-icons/io5";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Movies = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [tvGenre, setTvGenres] = useState([]);
  const [showFlag,setshowFlag] = useState(false);
  
  //handles genre filter click
  const handleGenre=async (id)=>{
    // console.log(id);
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}`)
    const data = await response.json();
    console.log(data)
    setList(data.results);
  }
  //handles show tile click
  const handleClick=(id)=>{
    navigate(`/tvShows/${id}`); 
  }
  //gets tv filtes
  const getTvFilter=()=>{
    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/tv/list',
        params: {language: 'en'},
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`
        }
      };
      
      axios
        .request(options)
        .then(res => {
          // console.log(res.data); 
          setTvGenres(res.data.genres)})
        .catch(err => console.error(err));
          return (
              <div>Test</div>
          )
  }
  //gets movie data
  const getData=()=>{
    //Headers and URL TMDB Site
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/tv',
      params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`
      }
    };
    //request to URL
    axios
      .request(options)
      .then(res => {console.log(res.data.results); setList(res.data.results)})
  }
  
  useEffect(() => {
    getData();
    getTvFilter();
  }, [])
  
  return (
    <div className='Movies'>
        <div className='text-white px-24 py-8 text-8xl font-medium'>
            <h1>Explore Shows</h1>
        </div>
        <div className="filters flex justify-start">
          <button onClick={()=>{setshowFlag(prev=>!prev)}}><IoOptions className='ml-28 text-white text-2xl right-0 hover:text-sky-500 hover:scale-125 ease-in duration-200' />
          </button>
      </div>
      <div className={`genres ${showFlag? "show":"hidden"} `}>
        <ul className='text-white px-4 flex flex-wrap gap-5 ml-24'>
          {tvGenre.map((genre,index)=>{
            return(
              <li key={index} className='p-2 rounded-lg text-sm hover:text-sky-500  hover:scale-105 duration-100 font-normal'><button onClick={()=>handleGenre(genre.id)}>{genre.name}</button></li>
            )
          })}
        </ul>
      </div>
      <div className="list pb-4 flex flex-wrap justify-center">
        {list.map((movie,index)=>{
          return(
              <div key={index} onClick={()=>handleClick(movie.id)} style={{
                backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,.9) 100%),url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
              }} className={`border-none text-white rounded-lg flex items-end border-2 m-4 w-1/5 h-[50vh] bg-cover bg-center card hover:scale-105 ease-in duration-200 hover:shadow-md hover:shadow-sky-500/50`}>              
              <div className="info m-2">
                <div className="ori_title mb-2 text-3xl font-bold">
                  {movie.name}
                </div>
                <div className="data text-zinc-400 text-sm">
                  {movie.first_air_date}
                </div>
                <div className="overview">
                  {/* {movie.overview} */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Movies