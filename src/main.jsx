import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Routes
} from "react-router-dom"; import './index.css'
import Layout from './Layout.jsx';
import Movies from './pages/Movies.jsx';
import TvShows from './pages/TvShows.jsx'
import Test from './pages/Test.jsx';
import FullPgDetails from './components/FullPgDetails.jsx';
import FullPgInfo from './components/FullPgInfo.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Movies/>}/>
      <Route path='tvShows' element={<TvShows/>}/>
      <Route path='movie/:id' element={<FullPgDetails/>}/>
      <Route path='tvShows/:id' element={<FullPgInfo/>}/>
      <Route path='test' element={<Test/>}/>
      <Route path="*" element={<div className='bg-zinc-900 h-screen text-white p-4 font-semibold text-3xl'>Empty Route, wrong way... </div>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
