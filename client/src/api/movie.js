// import { axiosInstance } from ".";
const { axiosInstance } = require(".");

//GET
export const getAllMovies = async () => {
    try{
        const response = await axiosInstance.get("/api/movies/get-all-movies");
        return response.data;
    }catch(err){
        console.log("Error occuered get all movies end point", err);
    }
}

export const getMovieById = async (movieId) => {
    try{
        const response = await axiosInstance.get(`/api/movies/get-movie/${movieId}`);
        return response.data;
    }catch(err){
        console.log("Error occuered get movies end point", err);
    }
}

//POST
export const addMovie = async (value) => {
    try{
        const response = await axiosInstance.post(`/api/movies/add-movie/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while adding new Movie", err);
    }
}

export const deleteMovie = async (value) => {
    try{
        const response = await axiosInstance.post(`/api/movies/delete-movie/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while deleting Movie", err);
    }
}


//PUT
export const updateMovie = async (value) => {
    try{
        const response = await axiosInstance.put(`/api/movies/update-movie/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while updating Movie", err);
    }
}