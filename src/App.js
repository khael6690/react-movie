import './App.css';
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react';


const App = () => {
  const [popularMovie, setPopularMovie] = useState([])


  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovie(result)
    })
  }, [])

  const PopularMovieList = () => {
    return popularMovie.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <img className='Movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className="Movie-title">{movie.title}</div>
          <div className="Movie-date">Release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q)
      setPopularMovie(query.results)
      // console.log({ query: query })
    }
  }

  // console.log({ popularMovie: popularMovie })

  return (
    <div className="App">
      <header className="App-header">
        <h2>Rate Movie</h2>
        <input type="text" placeholder='Cari film...' className='Movie-search' onChange={({ target }) => search(target.value)} />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
}

export default App;
