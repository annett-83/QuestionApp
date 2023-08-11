import axios from "axios";
import configFile from "../config.json";

const httpAuth = axios.create({
    baseURL: configFile.apiEndpoint
});

export default httpAuth;
