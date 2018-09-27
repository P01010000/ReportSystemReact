import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Intro = ({ title, introduction }) => (
    <div className="tapp__intro">
        <h1 className="headline">
            {title}
        </h1>
        <p>
            {introduction}
        </p>
    </div>
);

Intro.propTypes = {
	title: PropTypes.string,
	introduction: PropTypes.string
}

Intro.defaultProps = {
	title: 'Reportsystem',
	introduction: 'Hier kannst du einen neuen Störfall melden oder Störfälle verwalten'
}

const mapStateToProps = state => ({
	title: state.fetchBoardSettings.title,
	introduction: state.fetchBoardSettings.introduction
})

export default connect(mapStateToProps)(Intro);
