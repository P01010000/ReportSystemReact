import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button } from 'chayns-components';

class ReportListItem extends React.Component {
  static formatTime = (d) => {
    let diff = Math.round((new Date() - new Date(d)) / 1000);
    if (diff < 60) return `Vor ${diff} Sekunde${diff !== 1 ? 'n' : ''}`;
    diff = Math.round(diff / 60);
    if (diff < 60) return `Vor ${diff} Minute${diff !== 1 ? 'n' : ''}`;
    diff = Math.round(diff / 60);
    if (diff < 24) return `Vor ${diff} Stunde${diff !== 1 ? 'n' : ''}`;
    diff = Math.round(diff / 24);
    return `Vor ${diff} Tag${diff !== 1 ? 'en' : ''}`;
  }

  static propTypes = {
    description: PropTypes.string.isRequired,
    details: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    destinationName: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    emergency: PropTypes.bool,
    imageUrl: PropTypes.string.isRequired,
    creatorId: PropTypes.number.isRequired,
    creatorFirstName: PropTypes.string.isRequired,
    creatorLastName: PropTypes.string.isRequired,
    revisorId: PropTypes.number,
    revisorFirstName: PropTypes.string,
    revisorLastName: PropTypes.string,
    uacGroup: PropTypes.number.isRequired,
    uacGroupName: PropTypes.string.isRequired,
    history: PropTypes.instanceOf(Array),
    type: PropTypes.number.isRequired,
  }

  static defaultProps = {
    revisorId: 0,
    revisorFirstName: null,
    revisorLastName: null,
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
                <p className="ListItem__Title--description">{this.props.destinationName} | {this.props.creatorFirstName}</p>
              </div>
              <div className={`ListItem__Icon badge ${this.props.emergency ? 'emergency' : ''}`}>
                {ReportListItem.formatTime(this.props.creationTime)}
              </div>
            </div>
            <div className="ListItem__body">
              <div className="ListItem__content">
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Ersteller</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {this.props.type !== 3 ? <a href="#"><i className="fa fa-comments" /> {this.props.creatorFirstName} {this.props.creatorLastName}</a> : `${this.props.creatorFirstName} ${this.props.creatorLastName}`}
                  </div>
                </div>
                {this.props.type > 1 && this.props.revisorId > 0 && this.props.revisorFirstName && this.props.revisorLastName ?
                  <div style={{ display: 'flex', margin: '4px 0' }}>
                    <div>Bearbeiter</div>
                    <div style={{ marginLeft: 'auto' }}>
                      {this.props.type !== 2 ? <a href="#"><i className="fa fa-comments" /> {this.props.revisorFirstName} {this.props.revisorLastName}</a> : `${this.props.revisorFirstName} ${this.props.revisorLastName}`}
                    </div>
                  </div>
                  : null
                }
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Abteilung</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {[1, 2].includes(this.props.type) ? <Button chooseButton>{this.props.uacGroupName}</Button> : this.props.uacGroupName}
                  </div>
                </div>
                <div style={{ padding: '8px 0 12px' }}>
                  <img src={this.props.imageUrl} style={{ width: '100%' }} alt="" onClick={() => chayns.openImage(this.props.imageUrl)} onKeyUp={() => undefined}/>
                  {this.props.details ? <div style={{ padding: '0 8px' }}>{this.props.details}</div> : null}
                </div>
              </div>
              <Accordion head="Verlauf" isWrapped badge={this.props.history.length}>
                <div className="accordion__content">
                  {this.props.history && this.props.history.map(({ id, creationTime, message, userId, userName }) => (
                    <div className="historyItem" key={id} >
                      <div>{ReportListItem.formatTime(creationTime)}</div>
                      <div>{message ? chayns.utils.replacePlaceholder(message, [{ key: 'user', value: userName }]) : null}</div>
                    </div>
                  ))}
                </div>
              </Accordion>
              <div className="ListItem__content">
                <div style={{ textAlign: 'center' }}>
                  {[1, 2, 3].includes(this.props.type) ?
                    <Button>
                      {
                        {
                          1: 'Übernehmen',
                          2: 'Abgeben',
                          3: 'Stornieren',
                        }[this.props.type]
                      }
                    </Button> : null
                  }
                  {[1, 2].includes(this.props.type) ? <Button style={{ marginLeft: '8px' }}>Abschließen</Button> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ReportListItem;
