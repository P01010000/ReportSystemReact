import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';
import { toggleAccordion, closeAccordion, toggleReport } from '../actions/accordionControl';

const mapStateToProps = state => ({
    title: 'Deine Aufgaben',
    data: state.fetchYourTasks,
    ...state.accordionControl.yourTasks,
    type: 2
});

const mapDispatchToProps = dispatch => ({
  toggleAccordion: () => dispatch(toggleAccordion({ accordion: 'yourTasks' })),
  closeAccordion: () => dispatch(closeAccordion({ accordion: 'yourTasks' })),
  toggleReport: reportId => dispatch(toggleReport({ accordion: 'yourTasks', reportId }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportList);
