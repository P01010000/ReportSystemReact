import { SAVE_BOARD_SETTINGS } from '../actions/fetchBoardSettings';

export const initialState = { departments: [], destinations: [] };

const fetchBoardSettings = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_BOARD_SETTINGS:
            return action.data;
        default:
            return state;
    }
};

export default fetchBoardSettings;
