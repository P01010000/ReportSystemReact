import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';
import { toggleAccordion, closeAccordion, toggleReport } from '../actions/accordionControl';

const mapStateToProps = state => ({
    title: 'In Bearbeitung',
    data: state.fetchReportsInProgress,
    ...state.accordionControl.reportsInProgress,
    type: 4
});

const mapDispatchToProps = dispatch => ({
  toggleAccordion: () => dispatch(toggleAccordion({ accordion: 'reportsInProgress' })),
  closeAccordion: () => dispatch(closeAccordion({ accordion: 'reportsInProgress' })),
  toggleReport: reportId => dispatch(toggleReport({ accordion: 'reportsInProgress', reportId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
