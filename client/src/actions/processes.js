import {
    GET_PROCESSES, 
    PROCESS_ERROR,
    DELETE_PROCESS,
    ADD_PROCESS,
    ADD_SUBPROCESS,
    REMOVE_SUBPROCESS
} from './types';
import axios from 'axios';

// Получить процессы
export const getProcesses = () => async dispatch => {
    try {
        const res = await axios.get('/api/processes');

        dispatch({
            type: GET_PROCESSES,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: PROCESS_ERROR,
            payload: {msg: err.message}
        });
    }
};

// Удалить процесс
export const deleteProcess = (id) => async dispatch => {
    try {
        await axios.delete(`/api/processes/${id}`);

        dispatch({
            type: DELETE_PROCESS,
            payload: id
        })
    } catch(err) {
        dispatch({
            type: PROCESS_ERROR,
            payload: {msg: err.message}
            // payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
};

// Добавить процесс
export const addProcess = (formData) =>  async dispatch  => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/processes', formData, config);

        dispatch({
            type: ADD_PROCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: PROCESS_ERROR,
            payload: {msg: err.message}
        })
    }
};

// Добавить подпроцесс
export const addSubprocess = (processId, formData) =>  async dispatch  => {
    try {
        const res = await axios.post(`api/processes/subprocess/${processId}`, formData);
        
        dispatch({
            type: ADD_SUBPROCESS,
            payload: res.data,
        });

        dispatch(getProcesses());
    } catch(err) {
        console.error(err.message, 'error')
        dispatch({
            type: PROCESS_ERROR,
            payload: {msg: err.message}
        });
    }
};

// Удалить подпроцесс
export const deleteSubprocess = (processId, commentId) =>  async dispatch  => {
    
    try {
        await axios.delete(`api/processes/subprocess/${processId}/${commentId}`);

        dispatch({
            type: REMOVE_SUBPROCESS,
            payload: commentId
        })

        dispatch(getProcesses());
    } catch(err) {
        dispatch({
            type: PROCESS_ERROR,
            payload: {msg: err.message}    
        })
    }
};