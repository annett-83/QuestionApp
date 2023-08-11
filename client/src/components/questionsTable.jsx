import React from "react";
import PropTypes from "prop-types";
import Subject from "./fields/subject.jsx";
import Table from "./table/table.jsx";
import QuestionAnswerState from "./fields/questionAnswerState.jsx";

const QuestionsTable = ({
    questions,
    onSort,
    selectedSort,
    onClick,
}) => {
    const columns = {
        subject: {
            name: "Предмет",
            component: (question) => <Subject subject={question.subject} />
        },
        title: { path: "title", name: "Раздел" },
        price: { path: "price", name: "Цена, в руб." },
        state: {
            name: "Ответил/ла",
            component: (question) => (
                <QuestionAnswerState question={question} />
            )
        },
        button: {
            name: "Посмотреть",
            component: (question) => (
                <button type="button" className="btn btn-link" onClick={() => onClick(question._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"></path>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                    </svg>
                    <span className="visually-hidden">Button</span>
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={questions}
        />
    );
};
QuestionsTable.propTypes = {
    _id: PropTypes.string,
    subject: PropTypes.object,
    questions: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default QuestionsTable;
