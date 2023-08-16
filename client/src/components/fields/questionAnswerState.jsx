import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const QuestionAnswerState = ({ question }) => {
    const navigate = useNavigate();
    return !question.isOpen
        ? (
            <button onClick={() => navigate("/teacher/" + question.answer.user._id)} type="button" className="btn btn-link">{question.answer.user.name} </button>
        )
        : ( // ?  стоит для вопроса, ?! учитель может на него ответить
            <span>?{question.canAnswer ? <span>!</span> : <span></span>}</span>
        );
};
QuestionAnswerState.propTypes = {
    question: PropTypes.object
};

export default QuestionAnswerState;
