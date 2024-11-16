import React,{useEffect,useState} from 'react'
import { IoOptions } from "react-icons/io5";
import axios from 'axios';
import { IoIosTrendingUp } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [genre, setGenre] = useState([])
  const [page,setPage]=useState(1);
  const [showFlag, setshowFlag] = useState(false)
  const [toggleTopRated, setToggleTopRated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [search,setSearch] = useState("");

  //handles genre filter click
  const handleGenre=async (id)=>{
    // console.log(id);
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&with_genres=${id}&sort_by=popularity.desc&language=en-US&page=1`)
    const data = await response.json();
    // console.log(data);
    setList(data.results)
  } 
  //handles click on movies tile
  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };
  
  const listChange=()=>{
    setToggleTopRated(value=>!value)
    toggleTopRated ? getData():getTop_rated();
  }

  const getTop_rated=()=>{
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/top_rated',
      params: {language: 'en-IN', page: '1'},
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`
      }
    };
    
    axios
      .request(options)
      .then(res => {setList(res.data.results)})
      .catch(err => console.error(err));
  }

  //gets genre filtes for movies and setthem in the state genre
  const getFilters=()=>{
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list',
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
        setGenre(res.data.genres)})
      .catch(err => console.error(err));
  }
  
  const getData = async ()=>{
    const URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        const data = await axios.get(URL, {
          headers: {
            Authorization:
              `Bearer ${import.meta.env.VITE_API_READ_Access_Token}`,
            Accept: "application/json",
          },
        });
        // console.log(data)
        setList((prevData) => [...prevData, ...data.data.results]); // we are going to add the new data to current data.
        setLoading(false);
  }  

  const handleScroll = () => {
    if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
      setLoading(true);
    }
  };
  
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  window.addEventListener("scroll", debounce(handleScroll, 500));

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    getData();
    getFilters();
  }, [])
  
  return (
    <div className='Movies'>
      {/* page heading */}
      <div className='flex justify-between px-24 pt-16 pb-12'>
        <div className='text-white text-6xl xl:text-8xl font-medium'>
          <h1>Discover Movies</h1>
        </div>
      </div>
      {/* filter btns */} 
      <div className="filters flex ml-28 gap-5  ">
        <div className="filters-genre flex justify-start">
            <label htmlFor="genre" name="genre">
              <button onClick={()=>{setshowFlag(prev=>!prev)}}><IoOptions className=' text-white text-2xl right-0 hover:text-sky-500 hover:scale-125 ease-in duration-200' />
              </button>
            </label>
        </div>
        <div className="filters-Top_rated flex justify-start">
            <button onClick={listChange}><IoIosTrendingUp  className=' text-white text-2xl right-0 hover:text-sky-500 hover:scale-125 ease-in duration-200' />
            </button>
        </div>
      </div>
      {/* shows filters genre */}
      <div className={`genres ${showFlag? "show":"hidden"} `}>
                <ul className='text-white px-4 flex flex-wrap gap-5 ml-24 mt-2'>
                  {genre.map((genre,index)=>{
                    return(
                      <li key={genre.id} className='p-2 rounded-lg text-sm hover:text-sky-500  hover:scale-105 duration-100 font-normal'><button onClick={()=>handleGenre(genre.id)}>{genre.name}</button></li>
                    )
                  })}
                </ul>
      </div>
      {/* displays list array */}
      <div className="list mt-2p pb-12 flex flex-wrap justify-center">
        {list.map((movie,index)=>{
          return(
              <button onClick={() => handleMovieClick(movie.id)} key={index} style={{
                  backgroundImage: ` -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0,1) 100%),url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
                }} className={`border-none text-white rounded-lg flex items-end border-2 m-4 w-3/4 md:w-1/3 xl:w-1/5 h-[50vh] bg-cover bg-center card hover:scale-105 ease-in duration-200 hover:shadow-md hover:shadow-sky-500/50`}>              
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
      {loading && <h1 className='text-white font-medium px-12 pb-4 text-center'>Loading...</h1>}
    </div>
  )
}

export default Movies