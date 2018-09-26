import React from 'react';
import { Accordion, Button, Input } from 'chayns-components';
import InputImage from './InputImage';
import Groups from './Groups';
import { CREATE_DESCRIPTION, CREATE_DETAILS } from '../../constants/text';
import Emergency from './Emergency';
import { Login } from '../../helper/login';

class ReportForm extends React.Component {
  constructor() {
    super();
    this.state = { locationId: 0, locationName: 'Unknown' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    chayns.getGeoLocation()
    .then(({ latitude, longitude }) => {
      // fetch locationId and locationName from backend API
      const locationId = [1, 1214, 157669][Math.floor(Math.random() * 3)];
      const locationName = { 1: 'Bamboo', 1214: 'Tobit Software', 157669: 'P01010000' }[locationId];
      this.setState({ locationId, locationName });
    });
  }

  async handleSubmit() {
    await Login();
    if (Math.random() > 0.0) {
      chayns.dialog.alert('Dein Report wurde abgeschickt');
    } else {
      chayns.dialog.alert('Es ist ein Fehler aufgetreten');
    }
  }

  render() {
    return (
      <Accordion head="Problem melden" dataGroup="global" defaultOpened onOpen={this.getLocation} >
        <div className="accordion__content">
          <InputImage />
          <Input
            type="text"
            placeholder={CREATE_DESCRIPTION}
            style={{ margin: '15px 0' }}
            responsive
            required
          />
          <Input
            type="text"
            placeholder={CREATE_DETAILS}
            style={{ margin: '15px 0' }}
            responsive
          />
          <div style={{ display: 'flex', margin: '4px 0' }}>
            <h2>Ort</h2>
            <div style={{ marginLeft: 'auto' }}>
              <Button chooseButton>{this.state.locationName}</Button>
            </div>
          </div>
          <Groups
            groups={[
              { id: 11, name: 'Labs' },
              { id: 12, name: 'Facility' },
              { id: 13, name: 'Junior Team' },
              { id: 14, name: 'Web Technologies' },
              { id: 15, name: 'Creative Team' },
            ]}
          />
          <Emergency />
          <div style={{ textAlign: 'center', margin: '15px 0' }} >
            <Button onClick={this.handleSubmit}>Abschicken</Button>
          </div>
        </div>
      </Accordion>
    );
  }
}

export default ReportForm;
