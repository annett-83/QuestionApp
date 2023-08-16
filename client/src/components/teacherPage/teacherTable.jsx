import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Subjects from "../fields/subjects.jsx";
import Table from "../table/table.jsx";

const TeacherTable = ({
    userTeachers,
    onSort,
    selectedSort
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (userTeacher) => (
                <Link to={`/teacher/${userTeacher._id}`}>
                    {userTeacher.name}
                </Link>
            )
        },
        subject: {
            name: "Предмет",
            component: (userTeacher) => (
                <Subjects subjects={userTeacher.subjects} />
            )
        },
        /* rate: { path: "rate", name: "Оценка" }, пока не реализовано. */
        numberOfQuestions: {
            path: "numberOfQuestions",
            name: "Колиство отвеченных вопросов"
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={userTeachers}
        />
    );
};
TeacherTable.propTypes = {
    _id: PropTypes.string,
    subject: PropTypes.object,
    userTeachers: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default TeacherTable;
