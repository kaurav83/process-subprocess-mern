import React from 'react';
import PropTypes from 'prop-types';

const ModalForm = ({children, onClose, show}) => {
    if (!show) {
        return null;
    }
console.log(children)
    return (
        <div className="overlay">
            <div className="modal">
                <span className="modal-close" onClick={onClose} />
                {children}
            </div>
        </div>
    )
};

ModalForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default ModalForm;