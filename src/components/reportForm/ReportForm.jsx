import React from 'react';
import { Button, Input } from 'chayns-components';
import InputImage from './InputImage';
import Groups from './Groups';
import Urgency from './Urgency';
import { CREATE_DESCRIPTION } from '../../constants/text';

class ReportForm extends React.Component {
  constructor() {
    super();
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {

  }

  render() {
    return (
      <div className="content__card">
        <InputImage />
        <Input
          type="text"
          placeholder={CREATE_DESCRIPTION}
          style={{ margin: '15px 0'}}
          responsive
        />
        <Groups
          groups={[{ id: 2, name: 'Facility' }, { id: 3, name: 'Junior Team' }, { id: 4, name: 'Labs' }]}
        />
        <Urgency />
        <div style={{ textAlign: 'center', margin: '15px 0' }} >
          <Button >Abschicken</Button>
        </div>
      </div>
    );
  }
}

export default ReportForm;
