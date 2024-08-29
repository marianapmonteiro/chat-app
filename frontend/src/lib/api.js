import axios from "axios";
import { HOST } from "@/utils/constants"

const api = axios.create({
    baseURL: HOST,
})

export default api;