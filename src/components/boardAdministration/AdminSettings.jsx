import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { Accordion } from 'chayns-components';
import { updateBoardDepartments } from '../../actions/updateBoardSettings';
import DestinationSettings from './DestinationSettings';
import './AdminSettings.scss';

class AdminSettings extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    introduction: PropTypes.string,
    departments: PropTypes.instanceOf(Array).isRequired,
    destinations: PropTypes.instanceOf(Array).isRequired
  }

  static defaultProps = {
    title: undefined,
    introduction: undefined
  }

  constructor() {
    super();
    this.state = { groups: [], latitude: -1, longitude: -1 };
  }

  async componentWillMount() {
    chayns.showWaitCursor();
    // replace with fetch against my own backend api and return the preprocessed uacGroupList
    const res = await fetch(
      'https://api.chayns.net/v2.0/157669/UAC',
      {
        headers:
        {
          Authorization: 'Basic NDMwMDE1OjhmM2E0NTRlLTE5NGEtNDIwYi05MThmLThiZjgzZjljZjU3OA=='
        }
      }
    );

    const { latitude, longitude } = await chayns.getGeoLocation();

    let { data } = await res.json();
    data = data.map(g => ({ ...g, ...(this.props.departments.find(d => d.uacGroup === g.userGroupId)) }));

    this.setState({
      latitude,
      longitude,
      groups: data.map(g => ({
        departmentId: g.id,
        name: g.showName,
        showName: g.name,
        userGroupId: g.userGroupId
      }))
    });

    chayns.hideWaitCursor();
  }

  render() {
    return (
      <React.Fragment>
        <Accordion head="Abteilungen" className="department__settings" dataGroup="admin">
          {this.state.groups.map(g => (
            <div className="accordion__item" key={g.userGroupId}>
              <input id={`group${g.userGroupId}`} className="checkbox" type="checkbox" defaultChecked={g.departmentId} />
              <label htmlFor={`group${g.userGroupId}`}/>
              <div>
                <div>{g.name}</div>
                <ContentEditable html={g.showName} />
              </div>
            </div>
          ))}
        </Accordion>
        <Accordion head="Orte" dataGroup="admin">
          {this.props.destinations.map(d => <DestinationSettings key={d.id} {...d}/>)}
          <DestinationSettings
            id={-1}
            name="Neuer Ort"
            locationId={chayns.env.site.locationId}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            add
          />
        </Accordion>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.fetchBoardSettings.departments,
  destinations: state.fetchBoardSettings.destinations
});

const mapDispatchToProps = dispatch => ({
  updateDepartment: d => dispatch(updateBoardDepartments(d))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);
