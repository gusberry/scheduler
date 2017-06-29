import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CursorPosition from 'react-cursor-position';

import TableBodyRows from './TableBodyRows';

class TableLayout extends Component {
  render() {
    return (
      <div className="flex-table-body">
        <div className="flex-table-body-titles">
          {this.props.yAxe.map(dateObj =>
            <div key={dateObj} className="flex-table-body-title">
              {`${dateObj.getMonth()} / ${dateObj.getDate()}`}
            </div>,
          )}
        </div>
        <CursorPosition className="flex-table-body-data">
          <TableBodyRows yAxe={this.props.yAxe} />
        </CursorPosition>
      </div>
    );
  }
}

TableLayout.propTypes = {
  yAxe: PropTypes.array.isRequired,
};

export default TableLayout;
