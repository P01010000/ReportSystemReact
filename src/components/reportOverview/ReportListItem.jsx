import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button } from 'chayns-components';

class ReportListItem extends React.Component {
  static formatTime = (d) => {
    let diff = (new Date() - d) / 1000;
    if (diff < 60) return `Vor ${diff.toFixed(0)} Sekunden`;
    diff /= 60;
    if (diff < 60) return `Vor ${(diff).toFixed(0)} Minuten`;
    diff /= 60;
    if (diff < 24) return `Vor ${(diff).toFixed(0)} Stunden`;
    return `Vor ${(diff / 24).toFixed(0)} Tagen`;
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    details: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    locationId: PropTypes.number.isRequired,
    locationName: PropTypes.string.isRequired,
    emergency: PropTypes.bool,
    image: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    history: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    details: null,
    emergency: false,
    history: [],
  }

  constructor() {
    super();
    this.state = { open: false };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
        <div className="accordion__item">
          <div className={`ListItem ListItem--accordion${this.state.open ? ' ListItem--accordion--open' : ''}`} >
            <div className="ListItem__head" onClick={this.toggleOpen} onKeyUp={() => undefined}>
            <div className="ListItem__Arrow chayns__color--80"><i className="fa" /></div>
              <div className="ListItem__Image" style={{ backgroundImage: `url(https://sub60.tobit.com/l/${this.props.locationId})` }} />
              <div className="ListItem__Title">
                <p className="ListItem__Title--headline">{this.props.description}</p>
                <p className="ListItem__Title--description">{this.props.locationName}</p>
              </div>
              <div className={`ListItem__Icon badge ${this.props.emergency ? 'emergency' : ''}`}>
                {ReportListItem.formatTime(this.props.creationTime)}
              </div>
            </div>
            <div className="ListItem__body">
              <div className="ListItem__content">
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Ersteller</div>
                  <div style={{ marginLeft: 'auto' }}>{this.props.creator}</div>
                </div>
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Gruppe</div>
                  <div style={{ marginLeft: 'auto' }}><Button chooseButton>{this.props.group}</Button></div>
                </div>
                <div style={{ padding: '8px 0 12px' }}>
                  <img src={this.props.image} style={{ width: '100%' }} alt="" onClick={() => chayns.openImage(this.props.image)} onKeyUp={() => undefined}/>
                  {this.props.details ? <div style={{ padding: '0 8px' }}>{this.props.details}</div> : null}
                </div>
              </div>
              <Accordion head="Verlauf" isWrapped>
                  {this.props.history && this.props.history.map(({ date, message, user }) => (
                    <div className="historyItem">
                      <div>{date}</div>
                      <div>{user}</div>
                      <div>{message}</div>
                    </div>
                  ))}
              </Accordion>
              <div className="ListItem__content">
                <div style={{ textAlign: 'center' }}>
                  <Button style={{ marginRight: '8px' }}>Übernehmen</Button>
                  <Button>Abschließen</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ReportListItem;
