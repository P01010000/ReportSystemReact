import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { updateBoardDestinations } from '../../actions/updateBoardSettings';

const DestinationSettings = ({
  id,
  locationId,
  name,
  latitude,
  longitude,
  updateDestination,
  add
}) => (
  <div className="accordion__item ListItem">
    <div className="ListItem__head">
      <div className="ListItem__Image" style={{ backgroundImage: `url(https://sub60.tobit.com/l/${locationId})` }} />
      <div className="ListItem__Title">
        <ContentEditable
          className="ListItem__Title--headline"
          html={name}
          onBlur={({ target: { innerText: value } }) => updateDestination({ id, name: value })}
        />
        <div className="ListItem__Title--description">

          <ContentEditable
            html={latitude.toString()}
            onBlur={({ target: { innerText: value } }) => updateDestination({ id, latitude: Number.parseFloat(value) })}
          />
          <ContentEditable
            html={longitude.toString()}
            onBlur={({ target: { innerText: value } }) => updateDestination({ id, longitude: Number.parseFloat(value) })}
          />
        </div>
      </div>
      <div className="ListItem__Icon" style={{ lineHeight: '40px', paddingLeft: '10px' }}>
        <i className={`fa fa-lg ${add ? 'fa-plus' : 'fa-close'}`} />
      </div>
    </div>
  </div>
);

DestinationSettings.propTypes = {
  id: PropTypes.number.isRequired,
  locationId: PropTypes.number,
  name: PropTypes.string.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  updateDestination: PropTypes.func.isRequired,
  add: PropTypes.bool
};

DestinationSettings.defaultProps = {
  locationId: undefined,
  latitude: undefined,
  longitude: undefined,
  add: false
};

const mapDispatchToProps = dispatch => ({
  updateDestination: data => dispatch(updateBoardDestinations(data))
});

export default connect(undefined, mapDispatchToProps)(DestinationSettings);
