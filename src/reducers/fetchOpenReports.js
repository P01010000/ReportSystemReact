import { SAVE_OPEN_REPORTS } from '../actions/fetchData';

export const initialState = [];

const fetchOpenReports = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OPEN_REPORTS:
      return action.data;
    default:
      return state;
  }
};

export default fetchOpenReports;
