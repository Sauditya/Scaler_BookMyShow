import { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../../api/movie";
import { message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  
  const getData = async () => {
    try{
      dispatch(HideLoading);
      const response = await getAllMovies();
      if(response.success){
        setMovies(response.data);
      }else{
        message.error(response.message);
      }
      dispatch(ShowLoading);
    }catch(err){
      message.error(err.message);
      dispatch(ShowLoading);
    }
  };

  useEffect(()=>{
    getData();
  },[]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>

      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </>
  );
}

export default Home;