import React from 'react';
import { FileUpload } from 'chayns-components';
import 'chayns-components/lib/react-chayns-upload/index.css';
import './InputImage.scss';

class InputImage extends React.Component {
  constructor() {
    super();
    this.state = { imageSrc: null };
    this.handleClick = this.handleClick.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleUnload = this.handleUnload.bind(this);
  }

  handleClick() {
    const inputImage = document.createElement('input');
    inputImage.accept = 'image/*';
    inputImage.type = 'file';
    inputImage.onchange = this.handleLoad;
    inputImage.click();
  }

  handleLoad({ target: { files } }) {
    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = () => this.setState({ imageSrc: fr.result });
      fr.readAsDataURL(files[0]);
    }
  }

  handleUnload() {
    this.setState({ imageSrc: null });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.imageSrc === null ?
          <FileUpload type="image" onChange={(files, validFiles) => this.handleLoad({ target: { files: validFiles } })} />
          /*
          <div className="InputImage" onClick={this.handleClick} onDragOver={this.handleDragOver}>
            <i className="fa fa-picture-o" />Bild auswählen
          </div>
          */
          :
          <div className="PreviewImage">
            <div onClick={this.handleUnload} onKeyUp={() => null}><i className="fa fa-times" /></div>
            <img src={this.state.imageSrc} alt="" />
          </div>
        }

      </React.Fragment>
    );
  }
}
export default InputImage;
