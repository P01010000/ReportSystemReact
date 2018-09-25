import React from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'chayns-components';
import ReportListItem from './ReportListItem';
import './ReportList.scss';

class ReportOverview extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Array).isRequired
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Accordion head={this.props.title} dataGroup="global" className={`color--${chayns.env.parameters.colormode}`} >
        {this.props.data.map(r => <ReportListItem key={r.id} {...r} />)}
      </Accordion>
    );
  }
}

export default ReportOverview;
