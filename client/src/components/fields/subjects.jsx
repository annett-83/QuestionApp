import React from "react";
import PropTypes from "prop-types";

import Subject from "./subject.jsx";
const Subjects = ({ subjects }) => {
    return subjects.map((subject) => (
        <Subject key={subject._id} subject={subject} />
    ));
};

Subjects.propTypes = {
    subjects: PropTypes.array
};

export default Subjects;
