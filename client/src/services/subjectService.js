// import httpService from "./http.service";
import httpAuth from "./httpAuth.service";
const subjectEndpoint = "subject/";

const subjectService = {
    getSubjects: async () => {
        const { data } = await httpAuth.get(subjectEndpoint);
        return { data };
    }
};
export default subjectService;
