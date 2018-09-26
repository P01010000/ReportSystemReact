import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, SmallWaitCursor } from 'chayns-components';
import 'chayns-components/lib/react-chayns-smallwaitcursor/index.css';
import ReportListItem from './ReportListItem';
import './ReportList.scss';

class ReportList extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Array).isRequired,
    type: PropTypes.number.isRequired
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return this.props.data.length ? (
      <Accordion
        head={this.props.title}
        dataGroup="global"
        className={`color--${chayns.env.parameters.colormode}`}
        badge={this.props.data.length}
      >
        {this.props.data && this.props.data.map(r => <ReportListItem key={r.id} type={this.props.type} {...r} />)}
        {this.props.data.length === 0 ? <div className="accordion__content">Keine Berichte gefunden</div> : null}
      </Accordion>
    ) : null;
  }
}

export default ReportList;
