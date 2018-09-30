import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'chayns-components';
import 'chayns-components/lib/react-chayns-smallwaitcursor/index.css';
import ReportListItem from './ReportListItem';
import './ReportList.scss';

class ReportList extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    open: PropTypes.bool,
    openReportId: PropTypes.number,
    toggleAccordion: PropTypes.func.isRequired,
    closeAccordion: PropTypes.func.isRequired,
    toggleReport: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired
  }

  static defaultProps = {
    open: false,
    openReportId: undefined
  }

  constructor() {
    super();
    this.state = {};
  }


  render() {
    return this.props.data.length ? (
      <Accordion
        open={this.props.open}
        head={this.props.title}
        onOpen={this.props.toggleAccordion}
        onClose={this.props.closeAccordion}
        dataGroup="global"
        className={`color--${chayns.env.parameters.colormode}`}
        badge={this.props.data.length}
      >
        {this.props.data && this.props.data.map(r => (
          <ReportListItem
            key={r.id}
            open={this.props.openReportId === r.id || this.props.data.length === 1}
            toggleOpen={() => this.props.toggleReport(r.id)}
            fixed={this.props.data.length === 1}
            type={this.props.type}
            {...r}
          />
        ))}
        {this.props.data.length === 0 ? <div className="accordion__content">Keine Berichte gefunden</div> : null}
      </Accordion>
    ) : null;
  }
}

export default ReportList;
