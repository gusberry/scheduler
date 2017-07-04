import React from "react";
import PropTypes from "prop-types";

const TableHead = ({ year, xAxe }) =>
  <div className="flex-table-head">
    <div className="flex-table-head-item">
      {year}
    </div>
    {xAxe.map(text =>
      <div key={text} className="flex-table-head-item">
        {text}
      </div>
    )}
  </div>;

TableHead.propTypes = {
  xAxe: PropTypes.array.isRequired
};

export default TableHead;
