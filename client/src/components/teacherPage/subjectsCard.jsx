import React from "react";
import PropTypes from "prop-types";

import Subjects from "../fields/subjects.jsx";

const SubjectsCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Предмет</span>
                </h5>
                <div className="card-text">
                    <Subjects subjects={data} />
                </div>
            </div>
        </div>
    );
};
SubjectsCard.propTypes = {
    data: PropTypes.array
};

export default SubjectsCard;
