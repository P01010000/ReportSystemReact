import { SAVE_YOUR_REPORTS } from '../actions/fetchData';

export const initialState = [];

const fetchYourReports = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_YOUR_REPORTS:
      return action.data;
    default:
      return state;
  }
};

export default fetchYourReports;
