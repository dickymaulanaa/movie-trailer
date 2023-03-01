import { useEffect, useState } from "react"
import "./app2.css"
import { GetMovieList, SeachMovie } from "./api2"

function App() {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    GetMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const search = async (q) => {
    if (q.length > 3) {
      const query = await SeachMovie(q)
      setPopularMovies(query.results)
      console.log(query)
    }
  }

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            className="movie-image"
            alt={movie.title}
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
          />
          <div className="movie-date">Release : {movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      )
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie </h1>
        <input
          placeholder="cari film kesayangna"
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  )
}

export default App
