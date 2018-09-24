import React from 'react';
import PropTypes from 'prop-types';

const Groups = ({ groups }) => (
  <React.Fragment>
    <h2>Empfänger auswählen</h2>
    {groups && groups.map(({ id, name }) => (
      <div key={id} style={{ margin: '4px 0' }}>
        <input type="radio" className="radio" id={`group${id}`} name="group" />
        <label htmlFor={`group${id}`}>{name}</label>
      </div>
    ))}
  </React.Fragment>
);

Groups.propTypes = {
  groups: PropTypes.instanceOf(Array).isRequired
};

export default Groups;
