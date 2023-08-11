import httpService from "./http.service";
const commentEndpoint = "answer/";

const answerService = {
    create: async (payload) => {
        const { data } = await httpService.post(
            commentEndpoint + "new",
            payload
        );
        return { data };
    }
};
export default answerService;
