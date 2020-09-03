import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteProcess} from '../actions/processes';
import AddSubprocess from './AddSubprocess';
import Subprocess from './Subprocess';

const Process = ({deleteProcess, processItem}) => {
    const [showSubprocesses, setShow] = useState(false);

    const handleShow = () => {
        setShow(!showSubprocesses);
    }

    const renderSubprocesses = () => {
        return processItem.subprocesses.map(subprocess => {
            return <Subprocess 
                        key={subprocess._id} 
                        subprocess={subprocess} 
                        processId={processItem._id}    
                    />
        })
    }
    
    return (
        <Fragment>
            <li className="process">
                <h2 className="process__title">{processItem.title}</h2>
                <span 
                    className="delete process__delete"
                    onClick={() => deleteProcess(processItem._id)}
                />
                <p className={`process__state`}>Активное</p>
                <p className="process__expire">
                    Начало:<span className="process__time">time</span>
                </p>
                <p className="process__expire">
                    Завершиться:<span className="process__time">time</span>
                </p>
                <AddSubprocess processId={processItem._id} />

                <span 
                    onClick={handleShow}
                    className={
                        showSubprocesses ? 
                            "process__show-subprocess process__show-subprocess--active" 
                            : 
                            "process__show-subprocess"
                        }
                >{showSubprocesses ? "Свернуть" : "Развернуть"}</span>
            </li>
            <ul className="subprocesses process__subprocess">
                {showSubprocesses ? renderSubprocesses() : null}
            </ul>
        </Fragment>
    )
};


Process.propTypes = {
    processItem: PropTypes.object.isRequired,
    deleteProcess: PropTypes.func.isRequired
};

export default connect(null, {deleteProcess})(Process);