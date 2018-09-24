import React from 'react';
import { Input } from 'chayns-components';

const Urgency = () => (
  <React.Fragment>
    <h2 style={{ marginTop: '15px' }}>Dringlichkeit</h2>
    <div style={{ margin: '4px 0' }}>
      <input type="radio" className="radio" name="urgency" id="urgencyHigh" />
      <label htmlFor="urgencyHigh">Notfall</label>
    </div>
    <div style={{ margin: '4px 0' }}>
      <input type="radio" className="radio" name="urgency" id="urgencyNormal" defaultChecked />
      <label htmlFor="urgencyNormal">Normal</label>
    </div>
    <div style={{ margin: '4px 0' }}>
      <input type="radio" className="radio" name="urgency" id="urgencyLow" />
      <label htmlFor="urgencyLow">Stört nur</label>
    </div>
  </React.Fragment>
);

export default Urgency;
