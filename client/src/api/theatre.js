// import { axiosInstance } from ".";
const { axiosInstance } = require(".");

//GET
export const getAllTheatres = async () => {
    try{
        const response = await axiosInstance.get("/api/theatres/get-all-theatres");
        return response.data;
    }catch(err){
        console.log("Error occuered get all theatre end point", err);
    }
}

export const getAllTheatresByOwner = async (ownerId) => {
    try{
        const response = await axiosInstance.get(`/api/theatres/get-all-theatre-by-owner/${ownerId}`);
        return response.data;
    }catch(err){
        console.log("Error occuered get theatre end point", err);
    }
}

//POST
export const addTheatre = async (value) => {
    try{
        const response = await axiosInstance.post(`/api/theatres/add-theatre/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while adding new theatre", err);
    }
}

export const deleteTheatre = async (theatreId) => {
    try{
        const response = await axiosInstance.post(`/api/theatres/delete-theatre/${theatreId}`);
        return response.data;
    }catch(err){
        console.log("Error occuered while deleting theatre", err);
    }
}


//PUT
export const updateTheatre = async (value) => {
    try{
        const response = await axiosInstance.put(`/api/theatres/update-theatre/`,value);
        return response.data;
    }catch(err){
        console.log("Error occuered while updating theatre", err);
    }
}