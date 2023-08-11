import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import httpAuth from "./httpAuth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// http.interceptors.request.use(request => {
//     console.log('Starting Request', JSON.stringify(request, null, 2))
//     return request
// })

// http.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
// })

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken && expiresDate < Date.now()) {
            const { data } = await httpAuth.post("auth/token", {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });

            localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                expiresIn: data.expires_id,
                localId: data.user_id
            });
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = { Authorization: "Bearer " + accessToken };
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
