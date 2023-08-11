import React from "react";
import PropTypes from "prop-types";

const SearchStatusTeacher = ({ length }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "учитель online";
        }
        if (lastOne === 1) return "учитель online";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "учителя online";
        return "учитель online";
    };
    return (
        <h2>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `С тобой сегодня ${length + " " + renderPhrase(length)}`
                    : "нет ни одного учителя на связи, но ты можешь все равно задать свой вопрос"}
            </span>
        </h2>
    );
};
SearchStatusTeacher.propTypes = {
    length: PropTypes.number
};
export default SearchStatusTeacher;
