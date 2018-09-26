import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';

const mapStateToProps = state => ({
    title: 'Deine Aufgaben',
    data: state.fetchYourTasks,
    type: 2
});

export default connect(mapStateToProps)(ReportList);
