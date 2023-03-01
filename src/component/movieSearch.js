import { useNavigate } from "react-router-dom"
import Loaders from "./loaders"

const MovieSearch = (props) => {
  const dataSearch = props
  const data = dataSearch.dataSearch
  // console.log(data)
  const navigate = useNavigate()

  return (
    <>
      <div className="movie-container d-flex justify-content-center ">
        <div className="movie-wrapper d-flex flex-wrap justify-content-center d-flex-sm justify-content-sm-center ">
          <>
            {props.loading ? (
              <>
                <Loaders />{" "}
              </>
            ) : (
              <>
                {data.map((el, i) => {
                  return (
                    <div key={i}>
                      <div
                        className="movie-list d-flex flex-column align-items-center mb-3"
                        onClick={() => navigate(`/detail/${el.id}`)}
                      >
                        <img
                          src={`${process.env.REACT_APP_BASEIMGURL}/${el.poster_path}`}
                          alt=""
                          className="movie-img"
                        />
                        <div className="movie-title mt-2 text-center">{el.title}</div>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </>
        </div>
      </div>
    </>
  )
}

export default MovieSearch
