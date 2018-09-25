import React from 'react';
import { Accordion, Button, Input } from 'chayns-components';
import InputImage from './InputImage';
import Groups from './Groups';
import { CREATE_DESCRIPTION } from '../../constants/text';
import Emergency from './Emergency';

class ReportForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    alert(1);
  }

  render() {
    return (
      <Accordion head="Problem melden" dataGroup="global" defaultOpened>
        <div className="accordion__content">
          <InputImage />
          <Input
            type="text"
            placeholder="Titel"
            style={{ margin: '15px 0' }}
            responsive
            required
          />
          <Input
            type="text"
            placeholder={CREATE_DESCRIPTION}
            style={{ margin: '15px 0' }}
            responsive
          />
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
