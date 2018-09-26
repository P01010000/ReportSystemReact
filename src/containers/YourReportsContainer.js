import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';

const mapStateToProps = state => ({
    title: 'Deine Reports',
    data: state.fetchYourReports,
    type: 3
});

export default connect(mapStateToProps)(ReportList);
