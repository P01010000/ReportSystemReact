import React from 'react';
import { Input } from 'chayns-components';
import InputImage from './InputImage';
import { CREATE_DESCRIPTION } from '../../constants/text';

const Description = () => (
  <React.Fragment>
    <InputImage />
    <Input type="text" placeholder={CREATE_DESCRIPTION} responsive />
  </React.Fragment>
);

export default Description;
