import React, { Component } from "react";
import PropTypes from "prop-types";
import CursorPosition from "react-cursor-position";

import TableBodyRows from "./TableBodyRows";

const TableLayout = ({ yAxe, ...rest }) =>
  <div className="flex-table-body">
    <div className="flex-table-body-titles">
      {yAxe.map(dateObj =>
        <div key={dateObj} className="flex-table-body-title">
          {`${dateObj.getMonth()} / ${dateObj.getDate()}`}
        </div>
      )}
    </div>
    <CursorPosition className="flex-table-body-data">
      <TableBodyRows yAxe={yAxe} />
    </CursorPosition>
  </div>;

TableLayout.propTypes = {
  yAxe: PropTypes.array.isRequired
};

export default TableLayout;
