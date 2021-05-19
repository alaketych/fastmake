export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = ({message, content}) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL,
            message,
            content,
        })
    };
};

export const hideModal = () => {
    return dispatch => {
        dispatch({
            type: HIDE_MODAL,
        })
    }
}