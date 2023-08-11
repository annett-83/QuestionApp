import React from "react";
import { useSelector } from "react-redux";
import QuestionList from "../components/questionList.jsx";
import UserTeacherList from "../components/userTeacherList.jsx";
import { states as teacherStates } from "../store/teacherSlice";
import { states as subjectStates } from "../store/subjectSlice";
import { ColorRing } from "../../node_modules/react-loader-spinner/dist/index";


const Home = () => {
    const userData = useSelector((state) => state.user.data.userData);

    const isLoadingSubjectData = useSelector(subjectStates.isLoading);
    const isLoadingTeacherData = useSelector(teacherStates.isLoading);

    if (userData) {
        return <QuestionList />;
    } else {
        return (
            <div className="flex">
                <h1 className="center text-warning ">
              Учись легче, учись быстрее...
                </h1>
                <div>
                    <h2 className="center text-primary ">
                Наши опытные учителя ответят на все твои вопросы!
                    </h2>
                    {!isLoadingSubjectData && !isLoadingTeacherData ? (
                        <UserTeacherList />
                    ) : (
                        <ColorRing
                            visible={true}
                            height="200"
                            width="200"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                                "#e15b64",
                                "#f47e60",
                                "#f8b26a",
                                "#abbd81",
                                "#849b87",
                            ]}
                        />
                    )}
                </div>
            </div>
        );
    }
};

export default Home;
