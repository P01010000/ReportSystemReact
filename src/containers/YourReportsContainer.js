import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';
import { toggleAccordion, closeAccordion, toggleReport } from '../actions/accordionControl';

const mapStateToProps = state => ({
    title: 'Deine Reports',
    data: state.fetchYourReports,
    ...state.accordionControl.yourReports,
    type: 3
});

const mapDispatchToProps = dispatch => ({
  toggleAccordion: () => dispatch(toggleAccordion({ accordion: 'yourReports' })),
  closeAccordion: () => dispatch(closeAccordion({ accordion: 'yourReports' })),
  toggleReport: reportId => dispatch(toggleReport({ accordion: 'yourReports', reportId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
