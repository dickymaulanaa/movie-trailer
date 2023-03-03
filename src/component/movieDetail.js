import axios from "axios"
import { useEffect, useState } from "react"
// import Loaders from "./loaders"
import { useParams } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"
import Loaders from "./loaders"

const MovieDetail = () => {
  const [detailMovies, setDetailMovies] = useState([])
  const [videoMovie, setVideoMovie] = useState([])
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    const baseUrl = process.env.REACT_APP_BASEURL
    const apiKey = process.env.REACT_APP_APIKEY

    axios({
      method: "GET",
      url: `${baseUrl}/movie/${id}?api_key=${apiKey}`,
    })
      .then((result) => setDetailMovies(result.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    setLoading(true)
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASEURL}/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}`,
    })
      .then((result) => setVideoMovie(result.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id])

  console.log(detailMovies)

  const video = videoMovie.filter((videoMovie) => videoMovie.type === "Trailer")
  console.log(video, "data")

  // console.log(detailMovies)

  return (
    <>
      {loading ? (
        <>
          <Loaders />
        </>
      ) : (
        <>
          <div className="detail-container container d-flex flex-column mb-5">
            <div>
              <div className="container p-sm-5 d-flex flex-wrap flex-md-nowrap  " style={{ gap: "30px" }}>
                <img
                  src={`${process.env.REACT_APP_BASEIMGURL}/${detailMovies.poster_path}`}
                  alt="1"
                  className="poster-detail"
                />
                <div className="desc-movie">
                  <h2>{detailMovies.title}</h2>
                  <div className="d-flex flex-column">
                    <div className="d-flex me-2">
                      {detailMovies.genres ? (
                        <>
                          {detailMovies.genres.map((el, i) => {
                            return (
                              <button className=" me-2 btn-genre" disabled key={i}>
                                {" "}
                                {el.name}
                              </button>
                            )
                          })}{" "}
                        </>
                      ) : null}
                    </div>
                    <p className="fs-6 fw-light mb-1 mt-1">{detailMovies.release_date}</p>
                    <div className="d-flex mb-2 align-items-center">
                      {loading ? (
                        <></>
                      ) : (
                        <>
                          <AiFillStar className="rating-star" />
                        </>
                      )}
                      <h3 className="ms-2 mb-0 rating">
                        {Number(`${detailMovies.vote_average}`).toFixed(2)}
                      </h3>
                    </div>
                  </div>

                  <div className="overview">
                    <p>{detailMovies.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {loading ? (
        <>
          <Loaders />{" "}
        </>
      ) : (
        <div className="container p-sm-5 ">
          <h2 className="text-center mb-4">Watch Trailer</h2>
          <div className="d-flex justify-content-center  flex-column">
            {video.length === 0 ? (
              <img src="https://i.redd.it/ftfjtwljjw931.png" alt="not-found" className="mb-4" />
            ) : (
              <>
                {video.map((el, i) => {
                  return (
                    <div className="ratio ratio-16x9 mb-5" key={i}>
                      <iframe
                        src={`https://www.youtube.com/embed/${el.key}`}
                        // src="https://www.youtube.com/embed/SIQD0pUpC_Q"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MovieDetail
