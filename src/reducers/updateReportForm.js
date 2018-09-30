import { UPDATE_REPORT_FORM, CLEAR_REPORT_FORM } from '../actions/updateReportForm';

export const initialState = {
  imageUrl: undefined,
  description: undefined,
  details: undefined,
  destinationId: 0,
  destinationName: 'Wählen',
  departmentId: 0,
  emergency: false,
};

const updateReportForm = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REPORT_FORM:
      return Object.assign({}, state, action.data);
    case CLEAR_REPORT_FORM:
      return initialState;
    default:
      return state;
  }
};

export default updateReportForm;
