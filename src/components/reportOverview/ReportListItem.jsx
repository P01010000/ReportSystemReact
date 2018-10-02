import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion, Button } from 'chayns-components';
import formatTime from '../../helper/formatTime';
import ReportHistoryItem from './ReportHistoryItem';
import SERVER_URL from '../../constants/server-url';

class ReportListItem extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.string,
    creationTime: PropTypes.string.isRequired,
    destinationName: PropTypes.string.isRequired,
    departments: PropTypes.instanceOf(Array).isRequired,
    locationId: PropTypes.number.isRequired,
    emergency: PropTypes.bool,
    status: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
    creatorId: PropTypes.number.isRequired,
    creatorFirstName: PropTypes.string.isRequired,
    creatorLastName: PropTypes.string.isRequired,
    revisorId: PropTypes.number,
    revisorFirstName: PropTypes.string,
    revisorLastName: PropTypes.string,
    departmentId: PropTypes.number.isRequired,
    departmentName: PropTypes.string.isRequired,
    history: PropTypes.instanceOf(Array),
    open: PropTypes.bool,
    fixed: PropTypes.bool,
    toggleOpen: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
  }

  static defaultProps = {
    revisorId: 0,
    revisorFirstName: null,
    revisorLastName: null,
    details: null,
    emergency: false,
    status: 1,
    history: [],
    open: false,
    fixed: false
  }

  constructor() {
    super();
    this.sendMessage = this.sendMessage.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.changeReport = this.changeReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
  }

  async sendMessage(creator = true) {
    const id = creator ? this.props.creatorId : this.props.revisorId;
    const firstName = creator ? this.props.creatorFirstName : this.props.revisorFirstName;
    const lastName = creator ? this.props.creatorFirstName : this.props.revisorLastName;
    const { buttonType, text } = await chayns.dialog.input({
      title: 'Nachricht schicken',
      message: `Gib hier deine Nachricht für ${firstName} ${lastName} ein.`,
      buttons: [{ text: 'Senden', buttonType: 1 }]
    });

    if (buttonType !== 1 || !text) return;

    chayns.intercom.sendMessageToUser(id, { text });
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

    if (did === this.props.departmentId) return;

    const { buttonType, text } = await chayns.dialog.input({
      title: 'Kommentar',
      message: 'Möchtest du kommentieren, warum du den Report in eine andere Abteilung verschiebst?',
      buttons: [{ text: 'Ändern', buttonType: 1 }]
    });

    if (buttonType !== 1) return;

    try {
      await fetch(
        `${SERVER_URL}/api/report/${this.props.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            'Content-Type': 'application/json',
            TappId: chayns.env.site.tapp.id
          },
          body: JSON.stringify({
            Action: 6,
            DepartmentId: did,
            Message: text
          })
        }
      );
      chayns.dialog.alert('Erfolg');
      chayns.selectTapp({ id: chayns.env.site.tapp.id });
    } catch (ex) {
      chayns.dialog.alert(`Es ist ein Fehler aufgetreten.\n${ex.Message}`);
    }
  }

  async changeReport() {
    let body = {};
    switch (this.props.type) {
      case 1:
        body = { revisorId: chayns.env.user.id, action: 2 };
        break;
      case 2:
        body = { revisorId: -1, action: 4 };
        break;
      case 3:
        body = { action: 5, status: 3 };
        break;
      default:
        return;
    }

    try {
      await fetch(
        `${SERVER_URL}/api/report/${this.props.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            'Content-Type': 'application/json',
            TappId: chayns.env.site.tapp.id
          },
          body: JSON.stringify(body)
        }
      );
      chayns.dialog.alert('Erfolg');
      chayns.selectTapp({ id: chayns.env.site.tapp.id }, `show=${{ 1: 'yourTasks', 2: 'openReports', 3: 'yourReports' }[this.props.type]}&id=${this.props.id}`);
    } catch (ex) {
      chayns.dialog.alert(`Es ist ein Fehler aufgetreten.\n${ex.Message}`);
    }
  }

  async closeReport() {
    const { buttonType, text } = await chayns.dialog.input({
      title: 'Abschließen',
      message: 'Gib hier eine Nachricht ein',
      button: [{ text: 'Abschließen' }]
    });

    if (buttonType !== 1) return;

    try {
      await fetch(
      `${SERVER_URL}/api/report/${this.props.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
          'Content-Type': 'application/json',
          TappId: chayns.env.site.tapp.id
        },
        body: JSON.stringify({
          Action: 3,
          Status: 2,
          Message: text
        })
      }
      );
      chayns.dialog.alert('Report wurde erfolgreich abgeschlossen');
      chayns.selectTapp({ id: chayns.env.site.tapp.id });
    } catch (ex) {
      chayns.dialog.alert(`Es ist ein Fehler aufgetreten.\n${ex.Message}`);
    }
  }

  render() {
    return (
        <div className={`accordion__item ListItem ListItem--accordion${this.props.open ? ' ListItem--accordion--open' : ''}${this.props.fixed ? ' ListItem--accordion--fixed' : ''}`} >
          <div className="ListItem__head" onClick={this.props.toggleOpen} onKeyUp={() => undefined}>
          <div className="ListItem__Arrow chayns__color--80"><i className="fa" /></div>
            <div className="ListItem__Image" style={{ backgroundImage: `url(https://sub60.tobit.com/l/${this.props.locationId})` }} />
            <div className="ListItem__Title">
              <p className="ListItem__Title--headline">{this.props.description}</p>
              <p className="ListItem__Title--description">{this.props.destinationName} | {this.props.creatorFirstName}</p>
            </div>
            <div className={`ListItem__Icon badge ${this.props.emergency ? 'emergency' : ''} ${this.props.status===2 ? 'finished' : ''}`}>
              {formatTime(this.props.creationTime)}
            </div>
          </div>
          <div className="ListItem__body">
            <div className="ListItem__content">
              {this.props.type !== 3 ?
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Ersteller</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {this.props.type !== 3 ?
                      <a href="#" onClick={() => this.sendMessage(true)}>
                        <i className="fa fa-comments" />
                        {} {this.props.creatorFirstName} {this.props.creatorLastName}
                      </a> : `${this.props.creatorFirstName} ${this.props.creatorLastName}`
                    }
                  </div>
                </div>
                : null
              }
              {this.props.type > 2 ?
                <div style={{ display: 'flex', margin: '4px 0' }}>
                  <div>Bearbeiter</div>
                  <div style={{ marginLeft: 'auto' }}>
                    {this.props.revisorFirstName && this.props.revisorLastName ?
                      <a href="#" onClick={() => this.sendMessage(false)}>
                        <i className="fa fa-comments" />
                        {} {this.props.revisorFirstName} {this.props.revisorLastName}
                      </a>
                      : 'offen'
                    }
                  </div>
                </div>
                : null
              }
              <div style={{ display: 'flex', margin: '4px 0' }}>
                <div>Abteilung</div>
                <div style={{ marginLeft: 'auto' }}>
                  {[1, 2, 3].includes(this.props.type) ? <Button chooseButton onClick={this.updateDepartment}>{this.props.departmentName}</Button> : this.props.departmentName}
                </div>
              </div>
              <div style={{ padding: '8px 0 12px' }}>
                <img src={this.props.imageUrl} style={{ width: '100%' }} alt="" onClick={() => chayns.openImage(this.props.imageUrl)} onKeyUp={() => undefined}/>
                {this.props.details ? <div style={{ padding: '0 8px' }}>{this.props.details}</div> : null}
              </div>
            </div>
            <Accordion head="Verlauf" isWrapped badge={this.props.history.length}>
              <div className="accordion__content">
                {this.props.history && this.props.history.map(h => <ReportHistoryItem key={h.id} {...h} />)}
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
    );
  }
}

const mapStateToProps = state => ({
  departments: state.fetchBoardSettings.departments
});

export default connect(mapStateToProps)(ReportListItem);
