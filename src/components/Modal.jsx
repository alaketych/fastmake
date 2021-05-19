import React from 'react';
import classNames from 'classnames';
import '../sass/components/Message.sass';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../redux/actions';

function Modal({
    handleYes,
}){

    const dispatch = useDispatch();
    
    const modal = useSelector(({modal}) => modal);

    return modal.open && (
        <div className={classNames('modal_wrapper', {'open': modal.open}, {'close': !modal.open})}>
            <div className='modal_centered'>
                {
                    modal.message
                }
            </div>
            <div className='action_row'>
                <button onClick={handleYes}> Yes </button>
                <button onClick={() => dispatch(hideModal())}> No </button>
            </div>
        </div>
    )
}

export default Modal;