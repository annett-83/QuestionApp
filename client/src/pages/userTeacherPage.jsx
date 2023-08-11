import React from "react";
import PropTypes from "prop-types";
import UserTeacherCard from "../components/teacherPage/userTeacherCard.jsx";
import SubjectsCard from "../components/teacherPage/subjectsCard.jsx";
import { useParams } from "react-router-dom";
import NumberOfQuestionsCard from "../components/teacherPage/numberOfQuestionsCard.jsx";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const UserTeacherPage = () => {
    const params = useParams();
    const { teacherId } = params;
    const selectFilteredTeacher = createSelector(
        (state) => state.teacher.data,
        (teacherArray) => teacherArray.find((q) => q._id === teacherId)
    );
    const teacherData = useSelector(selectFilteredTeacher);
    if (teacherData) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-mb-4 mb-3">
                        <UserTeacherCard userTeacher={teacherData} />
                        <SubjectsCard data={teacherData.subjects} />
                        <NumberOfQuestionsCard
                            value={teacherData.numberOfQuestions}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loding...</h1>;
    }
};
UserTeacherPage.propTypes = {
    teacherId: PropTypes.string,
};
export default UserTeacherPage;
