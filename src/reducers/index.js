import { combineReducers } from 'redux';

import fetchYourReports from './fetchYourReports';
import fetchOpenReports from './fetchOpenReports';
import fetchYourTasks from './fetchYourTasks';
import fetchReportsInProgress from './fetchReportsInProgress';

export default combineReducers({
    fetchYourReports,
    fetchOpenReports,
    fetchYourTasks,
    fetchReportsInProgress
});
