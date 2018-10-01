import { TOGGLE_ACCORDION, TOGGLE_REPORT, CLOSE_ACCORDION } from '../actions/accordionControl';

export const initialState = {
  openReports: { open: false, openReportId: undefined },
  yourTasks: { open: false, openReportId: undefined },
  yourReports: { open: false, openReportId: undefined },
  reportsInProgress: { open: false, openReportId: undefined },
  reportForm: { open: true, openReportId: undefined }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACCORDION:
      return Object.assign({}, ...Object.keys(state).map(k => ({ [k]: { ...state[k], open: k === action.data.accordion ? !state[k].open : false } })));
    case CLOSE_ACCORDION:
      return Object.assign({}, ...Object.keys(state).map(k => ({ [k]: { ...state[k], open: k === action.data.accordion ? false : state[k].open } })));
    case TOGGLE_REPORT:
      // eslint-disable-next-line no-nested-ternary
      return Object.assign({}, ...Object.keys(state).map(k => ({ [k]: { ...state[k], openReportId: k === action.data.accordion ? (state[k].openReportId === action.data.reportId ? undefined : action.data.reportId) : state[k].openReportId } })));
    default:
      return state;
  }
};
