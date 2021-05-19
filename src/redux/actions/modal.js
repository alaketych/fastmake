export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export const showModal = ({message}) => {
    return dispatch => {
        dispatch({
            type: SHOW_MODAL,
            message
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