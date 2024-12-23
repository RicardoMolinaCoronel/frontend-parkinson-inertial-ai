import axios from "axios";
import { apiUrl } from "./apiUrl";

const baseUrl = apiUrl + "/upload"

const prediction = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data

}

export default { prediction }