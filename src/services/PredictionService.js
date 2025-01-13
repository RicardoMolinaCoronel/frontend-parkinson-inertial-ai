import axios from "axios";
import { apiUrl } from "./apiUrl";

const baseUrl = apiUrl + "backend/upload-and-predict/"

const prediction = async (axiosInstance, predictionFile) => {
    const formData = new FormData();
    formData.append("file", predictionFile);

    const { data } = await axiosInstance.post(baseUrl, formData)
    return data

}

export default { prediction }