import React from 'react';
import './Emergency.scss';

class Emergency extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    if (!this.state.checked) {
      chayns.dialog.confirm('Notfall melden', 'Einen Notfall zu melden hat weitgehende Konsequenzen. Bist du sicher, dass es sich um einen Notfall handelt?', [
        { text: 'Fortfahren', buttonType: 1 },
        { text: 'Kein Notfall', buttonType: 0 },
      ])
      .then(data => this.setState({ checked: data === 1 }));
    } else {
      this.setState({ checked: false });
    }
  }

  render() {
    return (
    <div className="emergencySwitch">
      <h2>
        Notfall
      </h2>
      <div>
        <input id="switch" className="switch" type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
        <label htmlFor="switch" />
      </div>
    </div>
    );
  }
}

export default Emergency;
