export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export const showMessage = ({message}) => {
    return dispatch => {
        dispatch({
            type: SHOW_MESSAGE,
            message
        })
    };
};

export const hideMessage = () => {
    return dispatch => {
        dispatch({
            type: HIDE_MESSAGE,
        })
    }
}