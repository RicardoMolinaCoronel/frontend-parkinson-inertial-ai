import axios from "axios";
import { apiUrl } from "./apiUrl";

const baseUrl = apiUrl + "/login/auth"

const login = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data

}

export default { login }