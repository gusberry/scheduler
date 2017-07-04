import React, { Component } from "react";
import PropTypes from "prop-types";

import { getPercentageOfDaySpend } from "../../../../../dateService";

const TableLayout = ({ start, end, current, itemIndex, onStartDragging }) => {
  const isEndDateTheSameAsCurrent =
    current.toDateString() === end.toDateString();
  const isStartDateTheSameAsCurrent =
    current.toDateString() === start.toDateString();

  let marginLeft = 0;
  let marginRight = 0;

  if (isEndDateTheSameAsCurrent) {
    marginRight = 100 - getPercentageOfDaySpend(end) + "%";
  }

  if (isStartDateTheSameAsCurrent) {
    marginLeft = getPercentageOfDaySpend(start) + "%";
  }

  return (
    <div className="data-row-element" style={{ marginLeft, marginRight }}>
      {isStartDateTheSameAsCurrent &&
        <div
          style={{ width: 15, cursor: "pointer", background: "yellow" }}
          onMouseDown={() => onStartDragging(itemIndex, "start")}
        />}
      <div style={{ flex: 1 }} onMouseDown={() => onStartDragging(itemIndex)}>
        date
      </div>
      {isEndDateTheSameAsCurrent &&
        <div
          style={{ width: 15, cursor: "pointer", background: "yellow" }}
          onMouseDown={() => onStartDragging(itemIndex, "end")}
        />}
    </div>
  );
};

TableLayout.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired
};

export default TableLayout;
