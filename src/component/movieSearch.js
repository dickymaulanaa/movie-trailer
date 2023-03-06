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
            {
              props.loading ? (
                <>
                  <Loaders />{" "}
                </>
              ) : (
                <>
                  {data.length === 0 ? (
                    <div style={{ height: "500px" }}>Movie not Found</div>
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
                                // {el.poster_path === null ? (src="http://binus.ac.id/malang/wp-content/uploads/2022/05/Picture1.png") : }
                                // src={`${process.env.REACT_APP_BASEIMGURL}/${el.poster_path}`}
                                src={
                                  el.poster_path === null
                                    ? "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                                    : `${process.env.REACT_APP_BASEIMGURL}/${el.poster_path}`
                                }
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
              )
              //   (
              //   <>{searchUi()}</>
              // )
            }
          </>
        </div>
      </div>
    </>
  )
}

export default MovieSearch
