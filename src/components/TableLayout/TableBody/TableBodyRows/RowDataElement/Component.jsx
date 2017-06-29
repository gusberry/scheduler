import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getPercentageOfDaySpend = date => {
  const startHours = date.getHours();
  const startMinutes = date.getMinutes();

  return (startHours + startMinutes / 60) / 24 * 100;
};

class TableLayout extends Component {
  render() {
    const { start, end, current } = this.props;

    const currentDate = new Date(current);
    const startDate = new Date(start);
    const endDate = new Date(end);
    const isEndDateTheSameAsCurrent =
      currentDate.toDateString() === endDate.toDateString();
    const isStartDateTheSameAsCurrent =
      currentDate.toDateString() === startDate.toDateString();

    let marginLeft = getPercentageOfDaySpend(startDate) + '%';
    let marginRight = 100 - getPercentageOfDaySpend(endDate) + '%';

    if (!isEndDateTheSameAsCurrent) {
      marginRight = 0;
    }

    if (!isStartDateTheSameAsCurrent) {
      marginLeft = 0;
    }

    return (
      <div className="data-row-element" style={{ marginLeft, marginRight }}>
        {isStartDateTheSameAsCurrent &&
          <div
            style={{ width: 15, cursor: 'pointer', background: 'yellow' }}
            onMouseDown={() =>
              this.props.onStartDragging(this.props.itemIndex, 'start')}
          />}
        <div
          style={{ flex: 1 }}
          onMouseDown={() => this.props.onStartDragging(this.props.itemIndex)}
        >
          date
        </div>
        {isEndDateTheSameAsCurrent &&
          <div
            style={{ width: 15, cursor: 'pointer', background: 'yellow' }}
            onMouseDown={() =>
              this.props.onStartDragging(this.props.itemIndex, 'end')}
          />}
      </div>
    );
  }
}

TableLayout.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
};

export default TableLayout;
