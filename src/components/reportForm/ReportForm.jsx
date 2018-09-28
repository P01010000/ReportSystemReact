import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion, Button, Checkbox, Input, FileUpload, TextArea } from 'chayns-components';
import 'chayns-components/lib/react-chayns-upload/index.css';
import { CREATE_DESCRIPTION, CREATE_DETAILS } from '../../constants/text';
import { Login } from '../../helper/login';
import Haversine from '../../helper/haversine';
import './ReportForm.scss';


class ReportForm extends React.Component {
  static propTypes = {
    departments: PropTypes.instanceOf(Array).isRequired,
    destinations: PropTypes.instanceOf(Array).isRequired
  }

  constructor() {
    super();
    this.state = {
      imageUrl: null,
      description: null,
      details: null,
      destinationId: 0,
      destinationName: 'Wählen',
      departmentId: null,
      emergency: false,
      ready: true
    };
    this.getLocation = this.getLocation.bind(this);
    this.chooseLocation = this.chooseLocation.bind(this);
    this.toggleEmergency = this.toggleEmergency.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    if (this.state.locationId === 0) return;
    chayns.getGeoLocation()
    .then(({ latitude, longitude }) => {
      const distances = this.props.destinations.map(d => ({ ...d, distance: Haversine(latitude, longitude, d.latitude, d.longitude) }));
      const nearest = distances.reduce((p, e) => p && (p.distance <= e.distance ? p : e), null);

      if (nearest) this.setState({ destinationId: nearest.Id, destinationName: nearest.name });
    });
  }

  chooseLocation() {
    chayns.dialog.select({
      title: 'Ort auswählen',
      message: 'Wo ist das Problem aufgetreten?',
      list: this.props.destinations.map(d => ({ name: d.name, value: d }))
    }).then((data) => {
      if (data.buttonType === 1 && data.selection.length) {
        this.setState({
          destinationId: data.selection[0].value.id,
          destinationName: data.selection[0].value.name
        });
      }
    });
  }

  toggleEmergency() {
    if (!this.state.emergency) {
      chayns.dialog.confirm('Notfall melden', 'Einen Notfall zu melden hat weitgehende Konsequenzen. Bist du sicher, dass es sich um einen Notfall handelt?', [
        { text: 'Fortfahren', buttonType: 1 },
        { text: 'Kein Notfall', buttonType: 0 },
      ])
      .then(data => this.setState({ emergency: data === 1 }));
    } else {
      this.setState({ emergency: false });
    }
  }

  async handleSubmit() {
    this.setState({ ready: false });
    chayns.showWaitCursor();
    try {
      await Login();

      await fetch(
        'https://localhost:5001/api/report',
        {
          method: 'POST',
          headers:
          {
            Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            'Content-Type': 'application/json'
          },
          body:
          JSON.stringify({
            creatorId: chayns.env.user.id,
            imageUrl: this.state.imageUrl,
            description: this.state.description,
            details: this.state.details,
            destinationId: this.state.destinationId,
            departmentId: this.state.departmentId
          })
        }
      );
      chayns.dialog.alert('Dein Report wurde abgeschickt');
    } catch (ex) {
      chayns.dialog.alert(ex.message);
    }
    chayns.hideWaitCursor();
    this.setState({ ready: true });
  }

  handleLoad(urls) {
    if (urls && urls instanceof Array && urls[0] && urls[0].url) this.setState({ imageUrl: urls[0].url });
  }

  render() {
    return (
      <Accordion head="Problem melden" dataGroup="global" defaultOpened onOpen={this.getLocation} >
        <div className="accordion__content">
          {!this.state.imageUrl ?
            <FileUpload type="image" upload onUpload={this.handleLoad} />
            :
            <div className="ImagePreview">
              <i className="fa fa-times" onClick={() => this.setState({ imageUrl: null })} />
              <img src={this.state.imageUrl} alt="" />
            </div>
          }
          <Input
            type="text"
            placeholder={CREATE_DESCRIPTION}
            style={{ margin: '15px 0' }}
            responsive
            required
            onChange={txt => this.setState({ description: txt || null })}
          />
          <TextArea
            type="text"
            placeholder={CREATE_DETAILS}
            style={{ marginBottom: '15px', width: '100%' }}
            autogrow
            onChange={txt => this.setState({ details: txt || null })}
          />
          <div style={{ display: 'flex', margin: '4px 0' }}>
            <h2>Ort</h2>
            <div style={{ marginLeft: 'auto' }}>
              <Button chooseButton onClick={this.chooseLocation} >{this.state.destinationName}</Button>
            </div>
          </div>
          <h2>Empfänger auswählen</h2>
          {this.props.departments.map(({ id, name }) => (
            <div key={id} style={{ margin: '4px 0' }}>
              <input type="radio" className="radio" id={`group${id}`} name="group" onChange={() => this.setState({ departmentId: id })} />
              <label htmlFor={`group${id}`}>{name}</label>
            </div>
          ))}
          <div className="emergencySwitch">
            <h2>Notfall</h2>
            <div>
              <Checkbox toggleButton checked={this.state.emergency} onChange={this.toggleEmergency} />
            </div>
          </div>
          <div style={{ textAlign: 'center', margin: '15px 0' }} >
            <Button
              onClick={this.handleSubmit}
              disabled={!(this.state.imageUrl && this.state.description && this.state.destinationId && this.state.departmentId && this.state.ready)}
            >
              Abschicken
            </Button>
          </div>
        </div>
      </Accordion>
    );
  }
}

const mapStateToProps = state => ({
  destinations: state.fetchBoardSettings.destinations,
  departments: state.fetchBoardSettings.departments
});

export default connect(mapStateToProps)(ReportForm);
