import React from 'react';
import { hot } from 'react-hot-loader';
import { Mode } from 'chayns-components';
import Intro from './intro/Intro';
import ReportForm from './reportForm/ReportForm';
import OpenReportsContainer from '../containers/OpenReportsContainer';
import YourTasksContainer from '../containers/YourTasksContainer';
import YourReportsContainer from '../containers/YourReportsContainer';
import ReportsInProgressContainer from '../containers/ReportsInProgressContainer';
import AdminIntro from './boardAdministration/AdminIntro';
import AdminSettings from './boardAdministration/AdminSettings';

const App = () => (
  <div>
    <Mode mode={0}>
      <Intro />
      <div className="tapp__content">
        <OpenReportsContainer />
        <YourTasksContainer />
        <YourReportsContainer />
        <ReportsInProgressContainer />
        <ReportForm />
      </div>
    </Mode>
    <Mode mode={1}>
      <AdminIntro />
      <div className="tapp__content">
        <AdminSettings />
      </div>
    </Mode>
  </div>
);

export default hot(module)(App);
