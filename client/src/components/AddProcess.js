import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes  from 'prop-types';
import {addProcess} from  '../actions/processes';
import ModalForm from './ModalForm';

const AddProcess = ({addProcess}) => {
    const [showModal, getFlag] = useState(false);
    const [state, setData] = useState({title: "", quantity: ""});

    const handleChange = (e) => {
        const  {name, value} = e.target;
        setData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addProcess(state);
        setData({title: "", quantity: ""});
    };

    const toggleModal = () => {
        getFlag(!showModal);
    };

    return (
        <Fragment>
            <div 
                className="processes__add-process"
                onClick={toggleModal}
            >
                <span className="processes__add-process-text">
                    Добавить производств. процесс
                </span>
            </div>
            <ModalForm
                show={showModal}
                onClose={toggleModal}
            >
                <h2 className="processes__title-inner-modal">
                    Добавить производственный процесс
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="processes__fields">
                        <div className="processes__field-group">
                            <label className="processes__label" htmlFor="title">
                                Результирующий полуфабрикат
                            </label>
                            <input 
                                type="text"
                                name="title"
                                onChange={(e) => handleChange(e)}
                                value={state.title}
                                className="processes__field"
                                id="title"
                            />
                        </div>
                        <div className="processes__field-group">
                            <label className="processes__label" htmlFor="quantity">
                                Кол-во
                            </label>
                            <input 
                                type="text"
                                name="quantity"
                                onChange={handleChange}
                                value={state.quantity}
                                className="processes__field"
                                id="quantity"
                            />
                        </div>
                    </div>
                    <button className="processes__submit-btn">Сохранить</button>
                </form>
            </ModalForm>
        </Fragment>
    )
};

AddProcess.propTypes = {
    addProcess: PropTypes.func.isRequired
};

export default connect(null, {addProcess})(AddProcess);