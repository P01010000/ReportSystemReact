import React from 'react';
import { hot } from 'react-hot-loader';
import Intro from './intro/Intro';
import ReportForm from './reportForm/ReportForm';

const App = () => (
    <div>
        <Intro />
        <div className="tapp__content">
            <ReportForm />
        </div>
    </div>
);

export default hot(module)(App);
