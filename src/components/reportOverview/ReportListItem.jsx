import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    destinationName: PropTypes.string.isRequired,
    departments: PropTypes.instanceOf(Array).isRequired,
    locationId: PropTypes.number.isRequired,
    emergency: PropTypes.bool,
    imageUrl: PropTypes.string.isRequired,
    creatorId: PropTypes.number.isRequired,
    creatorFirstName: PropTypes.string.isRequired,
    creatorLastName: PropTypes.string.isRequired,
    revisorId: PropTypes.number,
    revisorFirstName: PropTypes.string,
    revisorLastName: PropTypes.string,
    departmentId: PropTypes.number.isRequired,
    departmentName: PropTypes.string.isRequired,
    uacGroup: PropTypes.number.isRequired,
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
    this.sendMessage = this.sendMessage.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.changeReport = this.changeReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  async sendMessage() {
    const { buttonType, text } = await chayns.dialog.input({
      title: 'Nachricht schicken',
      message: `Gib hier deine Nachricht für ${this.props.creatorFirstName} ${this.props.creatorLastName} ein.`,
      buttons: [{ text: 'Senden', buttonType: 1 }]
    });

    if (buttonType !== 1 || !text) return;

    chayns.intercom.sendMessageToUser(this.props.creatorId, { text });
  }

  async updateDepartment() {
    const data = await chayns.dialog.select({
      title: 'Ort auswählen',
      message: 'Wo ist das Problem aufgetreten?',
      list: this.props.departments.map(d => ({ name: d.name, value: d }))
    });

    if (data.buttonType !== 1 || data.selection.length !== 1) {
      // error
      return;
    }
    const did = data.selection[0].value.id;

    if (did === this.props.uacGroup) return;

    const { buttonType, text } = await chayns.dialog.input({
      title: 'Kommentar',
      message: 'Möchtest du kommentieren, warum du den Report in eine andere Abteilung verschiebst?',
      buttons: [{ text: 'Ändern', buttonType: 1 }]
    });

    if (buttonType !== 1) return;
    fetch(
      `https://localhost:5001/api/report/${this.props.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Action: 2,
          DepartmentId: did,
          Message: text
        })
      }
    );
  }

  async changeReport() {
    let body = {};
    switch (this.props.type) {
      case 1:
      body = { revisorId: chayns.env.user.id, action: 2 };
      break;
      case 2:
      body = { revisorId: null, action: 4 };
      break;
      case 3:
      body = { action: 5, status: 3 };
      break;
      default:
      return;
    }

    fetch(
      `https://localhost:5001/api/report/${this.props.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
  }

  async closeReport() {
    const { buttonType, text } = await chayns.dialog.input({
      title: 'Abschließen',
      message: 'Gib hier eine Nachricht ein',
      button: [{ text: 'Abschließen' }]
    });

    if (buttonType !== 1) return;

    fetch(
      `https://localhost:5001/api/report/${this.props.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Action: 3,
          Status: 2,
          Message: text
        })
      }
    );
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
                    {this.props.type !== 3 ? <a href="#" onClick={this.sendMessage}><i className="fa fa-comments" /> {this.props.creatorFirstName} {this.props.creatorLastName}</a> : `${this.props.creatorFirstName} ${this.props.creatorLastName}`}
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
                    {[1, 2].includes(this.props.type) ? <Button chooseButton onClick={this.updateDepartment}>{this.props.departmentName}</Button> : this.props.departmentName}
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
                    <Button onClick={this.changeReport}>
                      {
                        {
                          1: 'Übernehmen',
                          2: 'Abgeben',
                          3: 'Stornieren',
                        }[this.props.type]
                      }
                    </Button> : null
                  }
                  {[1, 2].includes(this.props.type) ? <Button style={{ marginLeft: '8px' }} onClick={this.closeReport}>Abschließen</Button> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.fetchBoardSettings.departments
});

export default connect(mapStateToProps)(ReportListItem);
