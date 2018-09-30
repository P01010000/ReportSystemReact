import { combineReducers } from 'redux';

import fetchYourReports from './fetchYourReports';
import fetchOpenReports from './fetchOpenReports';
import fetchYourTasks from './fetchYourTasks';
import fetchReportsInProgress from './fetchReportsInProgress';
import fetchBoardSettings from './fetchBoardSettings';
import updateReportForm from './updateReportForm';
import accordionControl from './accordionControl';

export default combineReducers({
  fetchYourReports,
  fetchOpenReports,
  fetchYourTasks,
  fetchReportsInProgress,
  fetchBoardSettings,
  updateReportForm,
  accordionControl
});
