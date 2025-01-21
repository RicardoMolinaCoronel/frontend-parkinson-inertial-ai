import axios from "axios";
import { apiUrl } from "./apiUrl";

const baseUrl = apiUrl + "backend/upload-and-predict/"
const baseUrlUpdate = apiUrl + "backend/predictions/"
const prediction = async (axiosInstance, predictionFile) => {
    const formData = new FormData();
    formData.append("file", predictionFile);

    const { data } = await axiosInstance.post(baseUrl, formData)
    return data

}
const update_prediction = async (axiosInstance, id, observations) => {

    const { data } = await axiosInstance.post(baseUrlUpdate + id + "/update-observations/", observations)
    return data

}

export default { prediction, update_prediction }