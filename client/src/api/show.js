// import { axiosInstance } from ".";
const { axiosInstance } = require(".");

//GET
export const getShowsByTheatre = async (payload) => {
    try{
        const response = await axiosInstance.post("/api/shows/get-all-shows-by-theatre",payload);
        return response.data;
    }catch(err){
        console.log("Error occuered at get shows by theatre end point", err);
    }
}

export const getShowById = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-show-by-id',payload);
        return response.data;
    }catch(err){
        console.log("Error occuered get show end point", err);
    }
}

export const getAllTheatresByMovie = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/get-all-theatres-by-movie',payload);
        return response.data;
    }catch(err){
        console.log("Error occuered get shows end point", err);
    }
}

//POST
export const addShow = async (value) => {
    try{
        const response = await axiosInstance.post(`/api/shows/add-show/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while adding new show", err);
    }
}

export const deleteShow = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/shows/delete-show/',payload);
        return response.data;
    }catch(err){
        console.log("Error occuered while deleting show", err);
    }
}


//PUT
export const updateShow = async (value) => {
    try{
        const response = await axiosInstance.put(`/api/shows/update-show/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while updating show", err);
    }
}