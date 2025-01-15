import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Button, message, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
 

import { HideLoading, ShowLoading } from "../../redux/slices/loaderSlice";
import { getAllMovies } from "../../api/movie";
import DeleteMovieModal from "./DeleteMovieModal";
import MovieForm from "./MovieForm";



function MovieList() {

  const FakeMovies = [
    {
      key: "1",
      _id: "123241424",
      poster: "Image1",
      title: "Inside Out 2",
      description: "Crazines inside your brain goes to the next level",
      duration: 120,
      genre: "Animation",
      language: "English",
      releaseDate: "2024-06-01",
    },
    {
      key: "2",
      _id: "123241425",
      poster: "Image2",
      title: "Anatomy of a fall",
      description: "thrilling murder suspense",
      duration: 120,
      genre: "Thriller",
      language: "English",
      releaseDate: "2024-06-01",
    },
  ];

  const tableHeading = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (data, text) => {
        return (
          <img
            width="75"
            height="115"
            style={{ objectFit: "cover" }}
            src={data.poster}
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Minutes`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release date",
      dataIndex: "releaseDate",
      render: (data) => {
        return moment(data.releaseDate).format("MM-DD-YY");
      },
    },
    {
      title: "Action",
      render: (text, data) => {
        return (
          <div>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const [movies, setMovies] = useState(FakeMovies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getData = async() => {
    try{
      dispatch(ShowLoading());
      const response = await getAllMovies();
      const allMovies = response.data;

      setMovies(allMovies.map((item) => ({...item, key: `movie${item._id}`})));
      dispatch(HideLoading);
    }
    catch(err){
      message.error(err.message);
    }
  };

  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
    <div className="d-flex justify-content-end">
        <Button
            onClick={() => {
                setIsModalOpen(true);
                setFormType("add");
            }}
        >
            Add Movie
        </Button>
        <Table dataSource={movies} columns={tableHeading} />
        {isModalOpen && (
            <MovieForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formType={formType}
                getData={getData}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
            />
        )}
        {isDeleteModalOpen && (
            <DeleteMovieModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                getData={getData}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
            />
        )}
    </div>
</>

  );
}

export default MovieList;
