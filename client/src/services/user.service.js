import httpService from "./http.service";
import httpAuth from "./httpAuth.service";
import localStorageService from "./localStorage.service";
import { transformAxiosError } from "./helper/helper";

const userEndpoint = "user/";
const authEndpoint = "auth/";

const userService = {
    get: async (payload) => {
        try {
            const { data } = await httpAuth.post(
                authEndpoint + "signInWithPassword",
                payload
            );
            return { data };
        } catch (e) {
            return transformAxiosError(e);
        }
    },
    create: async (payload) => {
        try {
            const { data } = await httpAuth.post(
                authEndpoint + "signUp",
                payload
            );
            return { data };
        } catch (e) {
            return transformAxiosError(e);
        }
    },
    getCurrentUser: async (payload) => {
        try {
            const { data } = await httpService.get(
                userEndpoint + localStorageService.getUserId(),
                payload

            );
            return { data };
        } catch (e) {
            return transformAxiosError(e);
        }
    },
    updateUserData: async (payload) => {
        try {
            const { data } = await httpService.post(
                userEndpoint + "updateUserData/" + localStorageService.getUserId(),
                payload
            );
            return { data };
        } catch (e) {
            return transformAxiosError(e);
        }
    }

};
export default userService;
