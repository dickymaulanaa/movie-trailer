import axios from "axios"
import { useEffect, useState } from "react"
import Loaders from "./loaders"
import { useNavigate } from "react-router-dom"

const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const baseUrl = process.env.REACT_APP_BASEURL
    const apiKey = process.env.REACT_APP_APIKEY
    const getDataMovies = () => {
      axios({
        method: "GET",
        url: `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`,
      })
        .then((result) => setPopularMovies(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    getDataMovies()
  }, [])

  // console.log(popularMovies, " :popo")
  // const detail = (e, data) => {
  //   // navigate("/detail/646389")
  //   console.log(data)
  // }

  return (
    <>
      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <>
          <div className="movie-container d-flex justify-content-center ">
            <div className="movie-wrapper d-flex flex-wrap justify-content-center d-flex-sm justify-content-sm-center ">
              {popularMovies.map((el, i) => {
                return (
                  <div
                    className="movie-list d-flex flex-column align-items-center mb-3"
                    key={i}
                    onClick={() => navigate(`/detail/${el.id}`)}
                  >
                    <img
                      src={`${process.env.REACT_APP_BASEIMGURL}/${el.poster_path}`}
                      alt=""
                      className="movie-img"
                    />
                    <div className="movie-title mt-2 text-center">{el.title}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MovieList
