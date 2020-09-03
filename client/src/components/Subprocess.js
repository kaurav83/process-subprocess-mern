import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteSubprocess} from '../actions/processes';

const Subprocess = ({subprocess, deleteSubprocess, processId}) => {
    return (
        <li className="subprocess">
            <h2 className="process__title process__title--subprocess">
                {subprocess.title}
            </h2>

            <p className={`process__state`}>Активное</p>
            <p className="process__expire">
                Начало:<span className="process__time">time</span>
            </p>
            <p className="process__expire">
                Завершиться:<span className="process__time">time</span>
            </p>
            <span 
                className="delete subprocess__delete"
                onClick={() => deleteSubprocess(processId, subprocess._id)}
                title="Удалить подпроцесс"
            />
        </li>
    )
};

Subprocess.propTypes = {
    subprocess: PropTypes.object.isRequired,
    deleteSubprocess: PropTypes.func.isRequired,
    processId: PropTypes.string.isRequired
};

export default connect(null, {deleteSubprocess})(Subprocess);