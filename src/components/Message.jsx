import React from 'react';
import classNames from 'classnames';
import '../sass/components/Message.sass';
import { useSelector, useDispatch } from 'react-redux';
import { hideMessage } from '../redux/actions';

function Message(){

    const dispatch = useDispatch();
    
    const message = useSelector(({message}) => message);

    return message.open && (
        <div className={classNames('message_wrapper', {'open': message.open}, {'close': !message.open})}>
            <div className='message_centered'>
                {
                    message.message
                }
                <div className='close_icon'
                    onClick={() => dispatch(hideMessage())}
                >
                    &#10005;
                </div>
            </div>
        </div>
    )
}

export default Message;