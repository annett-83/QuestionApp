import httpService from "./http.service";
const commentEndpoint = "question/";

const questionService = {
    create: async (payload) => {
        const { data } = await httpService.post(
            commentEndpoint + "new",
            payload
        );
        return { data };
    },
    get: async () => {
        const { data } = await httpService.get(commentEndpoint);
        return { data };
    },
    remove: async (commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return { data };
    }
};
export default questionService;
