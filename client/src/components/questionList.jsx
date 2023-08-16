import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import PropTypes from "prop-types";

// import api from "../../../api";
import SearchStatus from "./fields/searchStatus.jsx";
import { paginate } from "./utils/paginate";
import GroupList from "./groupList.jsx";
import Pagination from "./pagination.jsx";
import QuestionsTable from "./questionsTable.jsx";

const QuestionList = () => {
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    //    const [subjects, setSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    //  const [users, setUsers] = useState();
    const [sortBy, setSortBy] = useState({ name: "price", order: "desc" });
    const navigate = useNavigate();
    const subjects = useSelector((state) => state.subject.data);
    const questions = useSelector((state) => state.user.data.questionData);
    //    const [comments, setComments] = useState();
    // useEffect(() => {
    //     api.comments.fetchAll().then((data) => setComments(data));
    // }, []);

    // eslint-disable-next-line no-unused-vars
    const handleDelete = (commentId) => {
        // setComments(comments.filter((comment) => comment._id !== commentId));
    };
    const handleOnClick = (commentId) => {
        navigate("/answerThatQuestion/" + commentId);
    };

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

    if (questions) {
        const filteredQuestions = selectedSubject
            ? questions.filter(
                (comment) => comment.subject._id === selectedSubject._id
            )
            : questions;

        const count = filteredQuestions.length;
        const sortedQuestions = _.orderBy(
            filteredQuestions,
            [sortBy.path],
            [sortBy.order]
        );
        const questionsCrop = paginate(sortedQuestions, currentPage, pageSize);
        //
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
                            onClick={clearFilter}>
                            Отчистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
                        <QuestionsTable
                            questions={questionsCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onClick={handleOnClick}
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
QuestionList.propTypes = {
    comments: PropTypes.array
};
export default QuestionList;
