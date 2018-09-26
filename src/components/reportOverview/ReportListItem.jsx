import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Button } from 'chayns-components';

class ReportListItem extends React.Component {
  static formatTime = (d) => {
    let diff = Math.round((new Date() - d) / 1000);
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
    locationId: PropTypes.number.isRequired,
    locationName: PropTypes.string.isRequired,
    emergency: PropTypes.bool,
    image: PropTypes.string.isRequired,
    creatorId: PropTypes.number.isRequired,
    creatorName: PropTypes.string.isRequired,
    revisorId: PropTypes.number,
    revisorName: PropTypes.string,
    group: PropTypes.string.isRequired,
    history: PropTypes.instanceOf(Array),
    type: PropTypes.number.isRequired,
  }

  static defaultProps = {
    revisorId: 0,
    revisorName: null,
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
                <p className="ListItem__Title--description">{this.props.locationName} | {this.props.creatorName.split(' ', 2)[0]}</p>
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
                    {this.props.type !== 3 ? <a href="#"><i className="fa fa-comments" /> {this.props.creatorName}</a> : this.props.creatorName}
                  </div>
                </div>
                {this.props.type > 1 && this.props.revisorId > 0 && this.props.revisorName ?
                  <div style={{ display: 'flex', margin: '4px 0' }}>
                    <div>Bearbeiter</div>
                    <div style={{ marginLeft: 'auto' }}>
                      {this.props.type !== 2 ? <a href="#"><i className="fa fa-comments" /> {this.props.revisorName}</a> : this.props.revisorName}
                    </div>
                  </div>
                  : null
                }
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Abteilung</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {[1, 2].includes(this.props.type) ? <Button chooseButton>{this.props.group}</Button> : this.props.group}
                  </div>
                </div>
                <div style={{ padding: '8px 0 12px' }}>
                  <img src={this.props.image} style={{ width: '100%' }} alt="" onClick={() => chayns.openImage(this.props.image)} onKeyUp={() => undefined}/>
                  {this.props.details ? <div style={{ padding: '0 8px' }}>{this.props.details}</div> : null}
                </div>
              </div>
              <Accordion head="Verlauf" isWrapped badge={this.props.history.length}>
                <div className="accordion__content">
                  {this.props.history && this.props.history.map(({ id, date, message, userId, userName }) => (
                    <div className="historyItem" key={id} >
                      <div>{ReportListItem.formatTime(date)}</div>
                      <div>{chayns.utils.replacePlaceholder(message, [{ key: 'user', value: userName }])}</div>
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
