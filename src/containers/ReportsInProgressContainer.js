import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';

const mapStateToProps = state => ({
    title: 'In Bearbeitung',
    data: state.fetchReportsInProgress,
    type: 4
});

export default connect(mapStateToProps)(ReportList);
