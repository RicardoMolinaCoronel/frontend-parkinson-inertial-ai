import axios from "axios";
import { apiUrl } from "./apiUrl";

const baseUrl = apiUrl + "backend/token/"

const login = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    console.log(data)
    return data

}

export default { login }