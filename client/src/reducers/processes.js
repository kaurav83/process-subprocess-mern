import {
    GET_PROCESSES,
    PROCESS_ERROR,
    DELETE_PROCESS,
    ADD_PROCESS,
    ADD_SUBPROCESS,
    REMOVE_SUBPROCESS
} from '../actions/types';

const initialState = {
    processes: [],
    process: null,
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PROCESSES :
            return {
                ...state, 
                processes: action.payload, 
                loading: false
            };
        case DELETE_PROCESS :
            return {
                ...state,
                processes: state.processes.filter(process  => process._id !== action.payload),
                loading: false
            };
        case ADD_PROCESS :
            return {
                ...state,
                processes: [action.payload,  ...state.processes],
                loading: false
            };
        case ADD_SUBPROCESS :
            return {
                ...state,
                process: {...state.process, subprocesses: action.payload},
                loading: false
            };
        case REMOVE_SUBPROCESS :
            return {
                ...state,
                process: {
                    ...state.process,
                    subprocess: state.process.subprocesses.filter(
                        subprocess => subprocess._id !== action.payload
                    )
                },
                loading: false
            }
        case PROCESS_ERROR :
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default :
            return state;
    }
}