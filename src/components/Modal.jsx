import React from 'react';
import classNames from 'classnames';
import '../sass/components/Modal.sass';
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
                <div>
                    {
                        modal.message
                    }
                </div>
                <div>
                    {
                        modal.content
                    }
                </div>
            </div>
            <div className='action_row'>
                <button onClick={modal.handleYes}> Yes </button>
                <button onClick={() => dispatch(hideModal())}> No </button>
            </div>
        </div>
    )
}

export default Modal;