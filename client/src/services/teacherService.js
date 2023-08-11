// import httpService from "./http.service";
import httpAuth from "./httpAuth.service";
const teacherEndpoint = "teacher/";

const teacherService = {
    getTeachers: async () => {
        const { data } = await httpAuth.get(teacherEndpoint);
        return { data };
    }
};
export default teacherService;
