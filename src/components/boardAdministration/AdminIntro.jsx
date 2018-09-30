import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';
import { updateBoardTitle, updateBoardIntroduction } from '../../actions/updateBoardSettings';

const AdminIntro = ({
  title,
  introduction,
  updateTitle,
  updateIntroducton
}) => (
  <div className="tapp__intro">
    <h1 className="headline">
      <ContentEditable
        html={title}
        onBlur={({ target: { innerText: value } }) => title !== value && updateTitle(value)}
      />
    </h1>
    <ContentEditable
      html={introduction}
      onBlur={({ target: { innerText: value } }) => introduction !== value && updateIntroducton(value)}
    />
  </div>
);

AdminIntro.propTypes = {
  title: PropTypes.string,
  introduction: PropTypes.string,
  updateTitle: PropTypes.func.isRequired,
  updateIntroducton: PropTypes.func.isRequired
};

AdminIntro.defaultProps = {
  title: '',
  introduction: ''
};

const mapStateToProps = state => ({
  title: state.fetchBoardSettings.title,
  introduction: state.fetchBoardSettings.introduction
});

const mapDispatchToProps = dispatch => ({
  updateTitle: title => dispatch(updateBoardTitle(title)),
  updateIntroducton: intro => dispatch(updateBoardIntroduction(intro))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminIntro);
