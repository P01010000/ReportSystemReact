import React from 'react';
import { hot } from 'react-hot-loader';
import Intro from './intro/Intro';
import ReportForm from './reportForm/ReportForm';
import OpenReportsContainer from '../containers/OpenReportsContainer';
import YourTasksContainer from '../containers/YourTasksContainer';
import YourReportsContainer from '../containers/YourReportsContainer';
import ReportsInProgressContainer from '../containers/ReportsInProgressContainer';

const App = () => (
    <div>
        <Intro />
        <div className="tapp__content">
            <OpenReportsContainer />
            <YourTasksContainer />
            <YourReportsContainer />
            <ReportsInProgressContainer />
            <ReportForm />
        </div>
    </div>
);

export default hot(module)(App);
