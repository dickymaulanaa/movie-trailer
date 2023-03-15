import axios from "axios"
import { useEffect, useState } from "react"
import Loaders from "./loaders"
import { Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const ComingSoon = () => {
  const [soonMovies, setSoonMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("")
  const currentTime = new Date().toISOString().slice(0, 10)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const baseUrl = process.env.REACT_APP_BASEURL
    const apiKey = process.env.REACT_APP_APIKEY
    const getDataMovies = () => {
      axios({
        method: "GET",
        url: `${baseUrl}/discover/movie?&api_key=${apiKey}&language=en-US&primary_release_date.gte=${currentTime}&primary_release_date.lte=2025-01-07&region=${country}&page=1`,
      })
        .then((result) => setSoonMovies(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
    getDataMovies()
  }, [currentTime, country])
  // console.log(currentTime)

  const handleCountry = (e) => {
    setCountry(e.target.value)
    // console.log(e.target.value)
  }

  return (
    <>
      <div className="movie-container  d-flex justify-content-center  ">
        <div className="movie-wrapper ">
          <div className="container-fluid mb-3 text-center">
            <h2>Country</h2>
            <Stack direction="horizontal" gap={3}>
              <button
                className="btn btn-outline-danger btn-country"
                value="US"
                onClick={(e) => handleCountry(e, "value")}
              >
                US
              </button>
              <button
                className="btn btn-outline-danger btn-country"
                value="JP"
                onClick={(e) => handleCountry(e, "value")}
              >
                Japan
              </button>
              <button
                className="btn btn-outline-danger btn-country"
                value="ID"
                onClick={(e) => handleCountry(e, "value")}
              >
                Indonesia
              </button>
              <button
                className="btn btn-outline-danger btn-country"
                value="KR"
                onClick={(e) => handleCountry(e, "value")}
              >
                Korea
              </button>
              <button
                className="btn btn-outline-danger btn-country"
                value="TR"
                onClick={(e) => handleCountry(e, "value")}
              >
                Thailand
              </button>
            </Stack>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <>
          <div className="movie-container d-flex justify-content-center ">
            <div className="movie-wrapper d-flex flex-wrap justify-content-center d-flex-sm justify-content-sm-center ">
              {soonMovies.map((el, i) => {
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
                    <div>{el.release_date}</div>
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

export default ComingSoon
