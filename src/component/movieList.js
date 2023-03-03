import axios from "axios"
import { useEffect, useState } from "react"
import Loaders from "./loaders"
import { useNavigate } from "react-router-dom"

const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState()
  const navigate = useNavigate()
  const [page, SetPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const baseUrl = process.env.REACT_APP_BASEURL
    const apiKey = process.env.REACT_APP_APIKEY
    const getDataMovies = () => {
      axios({
        method: "GET",
        url: `${baseUrl}/movie/popular?page=${page}&api_key=${apiKey}`,
      })
        .then((result) => {
          setPopularMovies(result.data.results)
          setTotalPage(result.data)
        })
        // .then((data) => console.log(data))
        // .then((data) => console.log(data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    getDataMovies()
  }, [page])

  const nextPage = () => {
    SetPage((prevPage) => prevPage + 1)
  }
  const prevPage = () => {
    SetPage((prevPage) => prevPage - 1)
  }
  console.log(totalPage)

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
          <div className="container d-flex justify-content-center mb-3">
            <div>
              {page === 1 ? (
                <button className="btn btn-danger" disabled>{`<`}</button>
              ) : (
                <button className="btn btn-danger" onClick={() => prevPage()}>{`<`}</button>
              )}

              <button className="btn btn-danger mx-1" disabled>
                {page}
              </button>
              {page === { totalPage } ? (
                <button className="btn btn-danger" disabled>{`>`}</button>
              ) : (
                <button className="btn btn-danger" onClick={() => nextPage()}>{`>`}</button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MovieList
