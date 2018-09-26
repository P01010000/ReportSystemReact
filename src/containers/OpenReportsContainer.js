import { connect } from 'react-redux';
import ReportList from '../components/reportOverview/ReportList';

const mapStateToProps = state => ({
	title: 'Offene Reports',
    data: state.fetchOpenReports,
    type: 1
});

export default connect(mapStateToProps)(ReportList);
