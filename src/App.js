import "./App.css"
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap"
import MovieList from "./component/movieList"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import MovieSearch from "./component/movieSearch"
import ComingSoonMovie from "./component/movieSoon"
import { useState } from "react"
import axios from "axios"
import MovieDetail from "./component/movieDetail"

function App() {
  const baseUrl = process.env.REACT_APP_BASEURL
  const apiKey = process.env.REACT_APP_APIKEY
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")
  const [dataSearch, setDataSearch] = useState([])

  const navigate = useNavigate()

  const handleInput = (e) => {
    const dataInput = e.target.value
    setInput(dataInput)
  }

  const searchMovie = () => {
    setLoading(true)
    if (input.length >= 0) {
      axios({
        method: "GET",
        url: `${baseUrl}/search/movie?query=${input}&page=1&api_key=${apiKey}`,
      })
        .then((result) => setDataSearch(result.data.results))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    } else {
      return alert("kurang")
    }
    navigate("/search")
    // setInput("")
    // console.log(input)
  }

  // let { detailId } = useParams()

  return (
    <div className="container-fluid px-0">
      <Navbar expand="lg" className="navbar-custom-color " variant="dark">
        <Container fluid className="px-0">
          <Navbar.Brand href="/" className="ps-3">
            MOVIE TRAILER
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="me-3" />
          <Navbar.Collapse
            id="navbarScroll"
            style={{ backgroundColor: "#282c34" }}
            className="py-3 px-3 text-start"
          >
            <Nav className="me-auto my-lg-0 mb-3 navlink " style={{ maxHeight: "150px" }} navbarScroll>
              <Link to="/">Popular</Link>
              <Link to="/coming-soon">Coming Soon</Link>
            </Nav>

            <div className="d-flex">
              <Form.Control
                value={input}
                type="text"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleInput}
              />
              <Button variant="danger" onClick={() => searchMovie()}>
                Search
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-fluid">
        <div className="img-header d-flex justify-content-center my-4 mb-5">
          <img
            src="https://static.onecms.io/wp-content/uploads/sites/6/2021/10/13/EW-Movies-Header-2021.png"
            alt="a"
          />
        </div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/coming-soon" element={<ComingSoonMovie />} />
          <Route path="/detail/:id" element={<MovieDetail />} />
          <Route
            path="/search"
            element={
              <>
                <MovieSearch input={input} dataSearch={dataSearch} loading={loading} />
              </>
            }
          />
          <Route path="*" element={<h1 className="text-center text-danger">404 NOT FOUND</h1>} />
        </Routes>
      </div>
      <footer className=" align-items-center d-flex justify-content-center">MOVIE TRAILER</footer>
    </div>
  )
}

export default App
