import { SAVE_YOUR_TASKS } from '../actions/fetchData';

export const initialState = [];

const fetchYourTasks = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_YOUR_TASKS:
      return action.data;
    default:
      return state;
  }
};

export default fetchYourTasks;
