import React from 'react';
import PropTypes from 'prop-types';
import formatTime from '../../helper/formatTime';

const actionToText = {
  1: '##user## hat diesen Bericht erstellt.',
  2: '##user## kümmert sich ab jetzt um dieses Problem.',
  3: '##user## hat diesen Bericht abgeschlossen.',
  4: '##user## kümmert sich nicht länger um dieses Problem.',
  5: '##user## hat dieses Problem storniert.',
  6: '##user## hat diesen Bericht nach ##departmentName## verschoben.'
};

const ReportHistoryItem = ({
  editorFirstName,
  editorLastName,
  action,
  departmentName,
  message,
  creationTime
}) => (
  <div className="historyItem" >
    <div>{formatTime(creationTime)}</div>
    <div>
      {actionToText[action] ? chayns.utils.replacePlaceholder(
        actionToText[action],
        [
          { key: 'user', value: `${editorFirstName} ${editorLastName}` },
          { key: 'departmentName', value: departmentName },
        ]
        ) : 'Unbekannte Aktion'
      }
      {message ? <React.Fragment><br />{message}</React.Fragment> : null}
    </div>
  </div>
);

ReportHistoryItem.propTypes = {
  editorFirstName: PropTypes.string.isRequired,
  editorLastName: PropTypes.string.isRequired,
  action: PropTypes.number.isRequired,
  departmentName: PropTypes.string.isRequired,
  message: PropTypes.string,
  creationTime: PropTypes.string.isRequired
};

ReportHistoryItem.defaultProps = {
  message: undefined
};

export default ReportHistoryItem;
