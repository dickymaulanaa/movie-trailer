import axios from "axios"
import { useEffect, useState } from "react"
import Loaders from "./loaders"
import { useNavigate } from "react-router-dom"

const TopRatedMovie = () => {
  const [topMovies, setTopMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const baseUrl = process.env.REACT_APP_BASEURL
    const apiKey = process.env.REACT_APP_APIKEY
    const getDataMovies = () => {
      axios({
        method: "GET",
        url: `${baseUrl}/movie/top_rated?&api_key=${apiKey}&page=1`,
      })
        .then((result) => setTopMovies(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    getDataMovies()
  }, [])

  return (
    <>
      <div className="movie-container  d-flex justify-content-center  ">
        <div className="movie-wrapper "></div>
      </div>

      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <>
          <div className="movie-container d-flex justify-content-center ">
            <div className="movie-wrapper d-flex flex-wrap justify-content-center d-flex-sm justify-content-sm-center ">
              {topMovies.map((el, i) => {
                return (
                  <div
                    className="movie-list d-flex flex-column align-items-center mb-3"
                    key={i}
                    onClick={() => navigate(`/detail/${el.id}`)}
                  >
                    <img
                      src={
                        el.poster_path === null
                          ? "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/image"
                          : `${process.env.REACT_APP_BASEIMGURL}/${el.poster_path}`
                      }
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

export default TopRatedMovie
