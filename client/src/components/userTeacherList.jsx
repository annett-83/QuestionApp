import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination.jsx";
import { paginate } from "./utils/paginate";
import GroupList from "./groupList.jsx";
// import api from "../../../api";
import TeacherTable from "./teacherPage/teacherTable.jsx";
import _ from "lodash";
import SearchStatusTeacher from "./teacherPage/searchStatusTeacher.jsx";
import { useSelector, shallowEqual } from "react-redux";

const UserTeacherList = () => {
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    //    const [subjects, setSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    const [sortBy, setSortBy] = useState({ path: "price", order: "desc" });

    const userTeachers = useSelector(
        (state) => state.teacher.data,
        shallowEqual
    );
    const subjects = useSelector((state) => state.subject.data);

    // useEffect(() => {
    //     api.subjects.fetchAll().then((data) => setSubjects(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedSubject]);
    const handleSubjectSelect = (item) => {
        setSelectedSubject(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (userTeachers) {
        const hasTeacherSubject = (teacher, subject) => {
            return (
                teacher.subjects.filter(
                    (tsubject) => tsubject._id === subject._id
                ).length > 0
            );
        };

        const filteredTeachers = selectedSubject
            ? userTeachers.filter((userTeacher) =>
                hasTeacherSubject(userTeacher, selectedSubject)
            )
            : userTeachers;

        const count = filteredTeachers.length;
        const sortedTeachers = _.orderBy(
            filteredTeachers,
            [sortBy.path],
            [sortBy.order]
        );
        const userTeacherCrop = paginate(sortedTeachers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedSubject();
        };

        return (
            <div className="d-flex">
                {subjects && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <p className="text-justify fw-bold text-warning border-bottom">
                            Выберите предмет
                        </p>
                        <GroupList
                            items={subjects}
                            onItemSelect={handleSubjectSelect}
                            selectedItem={selectedSubject}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Отчистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatusTeacher length={count} />
                    {count > 0 && (
                        <TeacherTable
                            onSort={handleSort}
                            selectedSort={sortBy}
                            userTeachers={userTeacherCrop}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};
UserTeacherList.propTypes = {
    comments: PropTypes.array
};

export default UserTeacherList;
