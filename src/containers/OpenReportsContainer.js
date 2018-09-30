import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';
import { toggleAccordion, closeAccordion, toggleReport } from '../actions/accordionControl';

const mapStateToProps = state => ({
    title: 'Offene Reports',
    data: state.fetchOpenReports,
    ...state.accordionControl.openReports,
    type: 1
});

const mapDispatchToProps = dispatch => ({
  toggleAccordion: () => dispatch(toggleAccordion({ accordion: 'openReports' })),
  closeAccordion: () => dispatch(closeAccordion({ accordion: 'openReports' })),
  toggleReport: reportId => dispatch(toggleReport({ accordion: 'openReports', reportId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
