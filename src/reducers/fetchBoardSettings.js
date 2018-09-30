import { SAVE_BOARD_SETTINGS } from '../actions/fetchBoardSettings';
import { UPDATE_BOARD_TITLE, UPDATE_BOARD_INTRODUCTION, UPDATE_BOARD_DEPARTMENTS, UPDATE_BOARD_DESTINATIONS } from '../actions/updateBoardSettings';

export const initialState = { departments: [], destinations: [] };

const fetchBoardSettings = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_BOARD_SETTINGS:
      return Object.assign({}, action.data);
    case UPDATE_BOARD_TITLE:
      return Object.assign({}, state, { title: action.data });
    case UPDATE_BOARD_INTRODUCTION:
      return Object.assign({}, state, { introduction: action.data });
    case UPDATE_BOARD_DEPARTMENTS:
      return Object.assign({}, state, { departments: state.departments.map(d => (d.Id === action.data.Id ? Object.assign({}, d, action.data) : d)) });
    case UPDATE_BOARD_DESTINATIONS:
      return Object.assign({}, state, { destinations: state.destinations.map(d => (d.id === action.data.id ? Object.assign({}, d, action.data) : d)) });
    default:
      return state;
  }
};

export default fetchBoardSettings;
