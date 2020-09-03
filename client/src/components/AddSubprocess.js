import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes  from 'prop-types';
import {addSubprocess} from  '../actions/processes';
import ModalForm from './ModalForm';

const AddSubprocess = ({processId, addSubprocess}) => {
    const [title, setData] = useState('');
    const [showModal, getFlag] = useState(false);
    
    const handleChange = (e) => {
        const  {value} = e.target;
        setData(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addSubprocess(processId, {title});

        setData("");
    };

    const toggleModal = () => {
        getFlag(!showModal);
    };

    return (
        <div className="processes__subprocess">
            <ModalForm
                show={showModal}
                onClose={toggleModal}
            >
            <h2 className="processes__title-inner-modal">
                Добавить производств. подпроцесс
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="processes__fields">
                    <div className="processes__field-group">
                        <label className="processes__label" htmlFor="title">
                            Подпроцесс
                        </label>
                        <input 
                            type="text"
                            name="title"
                            onChange={(e) => handleChange(e)}
                            value={title}
                            className="processes__field"
                            id="title"
                        />
                    </div>
                </div>
                <button className="processes__submit-btn processes__submit-btn--sub">Создать</button>
            </form>
            </ModalForm>
            <span 
                onClick={toggleModal}
                className="processes__add-process processes__add-process--subprocess"
                title="Добавить подпроцесс"
            />
        </div>
    )
}

AddSubprocess.propTypes = {
    addSubprocess: PropTypes.func.isRequired,
    processId: PropTypes.string.isRequired
}

export default connect(null, {addSubprocess})(AddSubprocess);