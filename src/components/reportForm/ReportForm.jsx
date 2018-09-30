import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Accordion, Button, Checkbox, Input, FileUpload, TextArea } from 'chayns-components';
import 'chayns-components/lib/react-chayns-upload/index.css';
import { CREATE_DESCRIPTION, CREATE_DETAILS } from '../../constants/text';
import { Login } from '../../helper/login';
import { updateReportForm, clearReportForm } from '../../actions/updateReportForm';
import { toggleAccordion as toggleAccordionAction, closeAccordion as closeAccordionAction } from '../../actions/accordionControl';
import './ReportForm.scss';


class ReportForm extends React.Component {
  static propTypes = {
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    details: PropTypes.string,
    destinationId: PropTypes.number.isRequired,
    destinationName: PropTypes.string.isRequired,
    departmentId: PropTypes.number.isRequired,
    emergency: PropTypes.bool.isRequired,
    departments: PropTypes.instanceOf(Array).isRequired,
    destinations: PropTypes.instanceOf(Array).isRequired,
    updateForm: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    open: PropTypes.bool,
    toggleAccordion: PropTypes.func.isRequired,
    closeAccordion: PropTypes.func.isRequired
  }

  static defaultProps = {
    imageUrl: undefined,
    description: undefined,
    details: undefined,
    open: true
  }

  constructor() {
    super();
    this.state = { ready: true };
    this.chooseLocation = this.chooseLocation.bind(this);
    this.toggleEmergency = this.toggleEmergency.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  chooseLocation() {
    chayns.dialog.select({
      title: 'Ort auswählen',
      message: 'Wo ist das Problem aufgetreten?',
      list: this.props.destinations.map(d => ({ name: d.name, value: d }))
    }).then((data) => {
      if (data.buttonType === 1 && data.selection.length) {
        this.props.updateForm({
          destinationId: data.selection[0].value.id,
          destinationName: data.selection[0].value.name
        });
      }
    });
  }

  toggleEmergency() {
    if (!this.props.emergency) {
      chayns.dialog.confirm('Notfall melden', 'Einen Notfall zu melden hat weitgehende Konsequenzen. Bist du sicher, dass es sich um einen Notfall handelt?', [
        { text: 'Fortfahren', buttonType: 1 },
        { text: 'Kein Notfall', buttonType: 0 },
      ])
      .then(data => this.props.updateForm({ emergency: data === 1 }));
    } else {
      this.props.updateForm({ emergency: false });
    }
  }

  async handleSubmit() {
    this.setState({ ready: false });
    chayns.showWaitCursor();
    let response;
    try {
      await Login();

      response = await fetch(
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
            imageUrl: this.props.imageUrl,
            description: this.props.description,
            details: this.props.details,
            destinationId: this.props.destinationId,
            departmentId: this.props.departmentId
          })
        }
      );

      const id = response.json();
      chayns.dialog.alert('Dein Report wurde abgeschickt');
      this.props.clearForm();
      chayns.selectTapp({ id: chayns.env.site.tapp.id }, `show=yourReports&id=${id}`);
    } catch (ex) {
      chayns.dialog.alert(response ? response.statusText : ex.message);
    }
    chayns.hideWaitCursor();
    this.setState({ ready: true });
  }

  handleLoad(urls) {
    if (urls && urls instanceof Array && urls[0] && urls[0].url) this.props.updateForm({ imageUrl: urls[0].url });
  }

  render() {
    return (
      <Accordion
        head="Problem melden"
        dataGroup="global"
        open={this.props.open}
        onOpen={this.props.toggleAccordion}
        onClose={this.props.closeAccordion}
      >
        <div className="accordion__content">
          {!this.props.imageUrl ?
            <FileUpload type="image" upload onUpload={this.handleLoad} />
            :
            <div className="ImagePreview">
              <i className="fa fa-times" onClick={() => this.props.updateForm({ imageUrl: undefined })} />
              <img src={this.props.imageUrl} alt="" />
            </div>
          }
          <Input
            type="text"
            placeholder={CREATE_DESCRIPTION}
            style={{ margin: '15px 0' }}
            responsive
            required
            onChange={txt => this.props.updateForm({ description: txt || undefined })}
            value={this.props.description}
          />
          <TextArea
            type="text"
            placeholder={CREATE_DETAILS}
            style={{ marginBottom: '15px', width: '100%' }}
            autogrow
            onChange={txt => this.props.updateForm({ details: txt || undefined })}
            value={this.props.details}
          />
          <div style={{ display: 'flex', margin: '4px 0' }}>
            <h2>Ort</h2>
            <div style={{ marginLeft: 'auto' }}>
              <Button chooseButton onClick={this.chooseLocation} >{this.props.destinationName}</Button>
            </div>
          </div>
          <h2>Empfänger auswählen</h2>
          {this.props.departments.map(({ id, name }) => (
            <div key={id} style={{ margin: '4px 0' }}>
              <input
                type="radio"
                className="radio"
                id={`group${id}`}
                name="group"
                checked={this.props.departmentId === id}
                onChange={() => this.props.updateForm({ departmentId: id })}
              />
              <label htmlFor={`group${id}`}>{name}</label>
            </div>
          ))}
          <div className="emergencySwitch">
            <h2>Notfall</h2>
            <div>
              <Checkbox toggleButton checked={this.props.emergency} onChange={this.toggleEmergency} />
            </div>
          </div>
          <div style={{ textAlign: 'center', margin: '15px 0' }} >
            <Button
              onClick={this.handleSubmit}
              disabled={!(this.props.imageUrl && this.props.description && this.props.destinationId && this.props.departmentId && this.state.ready)}
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
  departments: state.fetchBoardSettings.departments,
  ...state.updateReportForm,
  open: state.accordionControl.reportForm.open
});

const mapDispatchToProps = dispatch => ({
  updateForm: data => dispatch(updateReportForm(data)),
  clearForm: () => dispatch(clearReportForm()),
  toggleAccordion: () => dispatch(toggleAccordionAction({ accordion: 'reportForm' })),
  closeAccordion: () => dispatch(closeAccordionAction({ accordion: 'reportForm' }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
