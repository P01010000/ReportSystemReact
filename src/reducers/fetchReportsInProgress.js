import { SAVE_REPORTS_IN_PROGRESS } from '../actions/fetchData';

export const initialState = [];

const fetchReportsInProgress = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REPORTS_IN_PROGRESS:
      return action.data;
    default:
      return state;
  }
};

export default fetchReportsInProgress;
