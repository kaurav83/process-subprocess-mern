import React, {useEffect} from  'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProcesses} from '../actions/processes';
import AddProcess  from './AddProcess';
import Process from './Process';

const Processes = ({getProcesses, processes: {processes, loading}}) => {

    useEffect(() => {
        getProcesses();
    }, [getProcesses]);

    const renderProcess = () => {
        return processes.map(process => {
            return (
                <Process key={process._id} processItem={process} />
            )
        })
    };
    
    return (
        <div className="processes">
            <AddProcess />
            <ul className="processes__list">
            {
                loading ? '...Loading' : renderProcess()
            }
            </ul>
        </div>
    )
};

Processes.propTypes = {
    getProcesses: PropTypes.func.isRequired,
    processes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        processes: state.processes
    };
};

export default connect(mapStateToProps, {getProcesses})(Processes);